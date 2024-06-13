import express from "express";
import { addUser, deleteUser, getUser, getUsers, modifyUser } from "../controllers/users.controller";
import isauthenticated from "../middlewares/isauthenticated.middleware";

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', addUser);
userRouter.put('/:id', modifyUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;