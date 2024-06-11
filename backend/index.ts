import express from "express";
import cors from "cors";   
import userRouter from "./routes/users.router";
import eventsRouter from "./routes/events.router";
import authRouter from "./routes/auth.router";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => { 
    res.json("Welcome to Events Manager System API");
});

app.use('/auth', authRouter)
app.use('/users', userRouter);
app.use('/events', eventsRouter);


app.listen(8800, () => {
  console.log("Connected to port 8800");
});
