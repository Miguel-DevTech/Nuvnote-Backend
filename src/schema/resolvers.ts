import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Task from '../models/Task';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const resolvers = {
    Query: {
        me: async (_: any, __: any, context: any) => {
        return context.user;
        },
        tasks: async (_: any, __: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        return Task.find({ userId: context.user.id });
        },
    },

    Mutation: {
        register: async (_: any, { email, password }: { email: string; password: string }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email already registered');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return { token, user };
        },

        login: async (_: any, { email, password }: { email: string; password: string }) => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid password');

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return { token, user };
        },

        addTask: async (_: any, { name, priority }: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        const task = await Task.create({ name, priority, userId: context.user.id });
        return task;
        },

        deleteTask: async (_: any, { id }: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        await Task.deleteOne({ _id: id, userId: context.user.id });
        return true;
        },

        updateTask: async (_: any, { id, ...updates }: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: context.user.id },
            updates,
            { new: true }
        );
        return task;
        },
    },
};
