import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Task from '../models/Task';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface ContextType {
    user?: { id: string; email: string} | null;
}

export const resolvers = {
    Query: {
        me: async (_: any, __: any, context: ContextType) => {
            return context.user;
        },
        tasks: async (_: any, __: any, context: ContextType) => {
            if (!context.user) throw new Error('Authentication required to access this resource.');
            return Task.find({ userId: context.user.id });
        },
    },

    Mutation: {
        register: async (_: any, { email, password }: { email: string; password: string }) => { 
            if(!email || !password) throw new Error("Email and password are required.");

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('Email already registered.');

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });

            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

            return { token, user };
            },

        login: async (_: any, { email, password }: { email: string; password: string }) => {
            if(!email || !password) throw new Error("Email and password are required.");

            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

            return { token, user };
            },

        addTask: async (_: any, { name, priority }: any, context: ContextType) => {
            if (!context.user) throw new Error('Authentication required to add a task.');

            const task = await Task.create({ name, priority, userId: context.user.id });
            return task;
            },

        deleteTask: async (_: any, { id }: any, context: ContextType) => {
            if (!context.user) throw new Error('Authentication required to delete a task.');
            
            const result = await Task.deleteOne({ _id: id, userId: context.user.id });
            return result.deletedCount === 1;
            },

        updateTask: async (
            _: any, 
            { id, ...updates }: { id: string; name?: string; done?: boolean; priority?: string }, 
            context: ContextType
        ) => {
            if (!context.user) throw new Error('Authentication required to update a task.');

            const task = await Task.findOneAndUpdate(
                { _id: id, userId: context.user.id },
                updates,
                { new: true }
            );
            if(!task) throw new Error("Task not found or you´re not authorized to update it");
            return task;
        },
    },
};
