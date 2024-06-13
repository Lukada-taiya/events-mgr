import express from "express";
import passport from "./middlewares/passport.middleware"; 
import helmet from "helmet";
import cors from 'cors';
import fs from 'fs';
import path from "path";
import https from "https";

import userRouter from "./routes/users.router";
import eventsRouter from "./routes/events.router";
import authRouter from "./routes/auth.router"; 
import {cookieSessionMiddleware, cookieSessionBugFix} from "./middlewares/cookiesession.middleware";
import isauthenticated from "./middlewares/isauthenticated.middleware";

let { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieSessionMiddleware);
app.use(cookieSessionBugFix);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => { 
    res.json("Welcome to Events Manager System API");
});

app.use('/auth', authRouter);
app.use('/users', passport.authenticate('bearer', { session: false }), isauthenticated, userRouter);
app.use('/events', eventsRouter);

https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem'))
}, app).listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
