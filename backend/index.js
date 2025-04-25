import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from "dotenv"

import passport from 'passport';
import session from "express-session";
import connectMongo from "connect-mongodb-session"
import { buildContext } from "graphql-passport";


import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from './db/connectDB.js';
import { configurePassport } from './passport/passport.config.js';

dotenv.config()
configurePassport()

const app = express()
app.use(express.urlencoded({ extended: true }));


const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
})

store.on("error", (err) => console.log(err));

app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }, store: store
}))


app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})


// Note you must call `start()` on the `ApolloServer`
await server.start();

app.use(
    '/',
    cors({
        origin: "http://localhost:3000",
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            return buildContext({ req, res })
        },
    }),
);

// Modified server startup
await new Promise((resolve) =>
    httpServer.listen({ port: 8080 }, resolve),
);
connectDB()

console.log(`🚀 Server ready at http://localhost:8080/`);