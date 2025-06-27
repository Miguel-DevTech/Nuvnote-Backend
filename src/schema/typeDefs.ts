import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        email: String!
    }

    type AuthPayLoad {
        token: String!
        user: User!
    }
    
    type Task {
        id: ID!
        name: String!
        priority: String!
        done: Boolean!
        userId: ID!
    }
    
    type Query {
        me: User
        tasks: [Task!]!
    }

    type Mutation {
        register(email: String!, password: String!): AuthPayLoad!
        login(email: String!, password: String!): AuthPayLoad!
        logout: Boolean!
        addTask(name: String!, priority: String!): Task!
        deleteTask(id: ID!): Boolean!
        updateTask(id: ID!, name: String, done: Boolean, priority: String): Task!
    }
`;