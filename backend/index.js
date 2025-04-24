import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from "dotenv"

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from './db/connectDB.js';

dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true }));


const httpServer = http.createServer(app)


const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})


// Note you must call `start()` on the `ApolloServer`
await server.start();

app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
            console.log("({ req })", req)
            return { req }
        },
    }),
);

// Modified server startup
await new Promise((resolve) =>
    httpServer.listen({ port: 8080 }, resolve),
);
connectDB()

console.log(`🚀 Server ready at http://localhost:8080/`);