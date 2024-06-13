import express from "express";
import { addUser, deleteUser, getUser, getUsers, modifyUser } from "../controllers/users.controller";
import isauthenticated from "../middlewares/isauthenticated.middleware";

const userRouter = express.Router();

userRouter.get('/', isauthenticated, getUsers);
userRouter.get('/:id', isauthenticated, getUser);
userRouter.post('/', isauthenticated, addUser);
userRouter.put('/:id', isauthenticated, modifyUser);
userRouter.delete('/:id', isauthenticated, deleteUser);

export default userRouter;