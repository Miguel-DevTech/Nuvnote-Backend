import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { getUserFromToken } from './middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
    const app = express();

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

    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🛢️ MongoDB connected');

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();
