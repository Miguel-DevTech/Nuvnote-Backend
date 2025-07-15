// backend/src/index.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { getUserFromToken } from './middleware/auth';
import bodyParser from 'body-parser';

dotenv.config();

const startServer = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    app.use(cookieParser());

    app.use(cors({
        origin: ['http://localhost:5173', 'https://nuvnote-frontend.vercel.app'], // ajuste aqui para seu front-end
        credentials: true,
    }));

    app.options('/graphql', cors({
        origin: ['http://localhost:5173', 'https://nuvnote-frontend.vercel.app'],
        credentials: true,
    }));

    app.use(bodyParser.json());

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in .env");
        }
        
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🛢️ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }) => {
        const token = req.cookies.token || '';
        const user = getUserFromToken(token);
        return { user, res };
        }
    }));

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
};

startServer();
