import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { getUserFromToken } from './middleware/auth';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const startServer = async () => {
    const app = express();
    app.use(cors());

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🛢️ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const user = getUserFromToken(token);
            return { user };
        },
    });
    
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

startServer();
