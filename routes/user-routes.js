import express from "express";
import { getAllUsers, getBookingsofUser, getUserById, signup, updateUser } from "../controllers/user-controller";

const userRouter = express. Router();

userRouter.get ("/", getAllUsers);
userRouter.get ("/:id", getUserById);

userRouter.post ("/signup", signup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",getBookingsofUser)


export default userRouter;