import express from "express"
import { loginUser,registerUser,getAllUsers,deleteUser } from "../controllers/userController.js"


const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get('/getusers', getAllUsers); 
userRouter.delete('/users/:id', deleteUser); 

export default userRouter;