import express from "express";
import passport from "./middlewares/passport.middleware"; 
import helmet from "helmet";
import cors from 'cors'

import userRouter from "./routes/users.router";
import eventsRouter from "./routes/events.router";
import authRouter from "./routes/auth.router"; 
import cookieSessionMiddleware from "./middlewares/cookiesession.middleware";

let { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieSessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => { 
    res.json("Welcome to Events Manager System API");
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
