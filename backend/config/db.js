import mongoose from "mongoose";

export const connectDB= async () =>{
    try {
        await mongoose.connect('mongodb+srv://nirushikan2001:ntQ5b6vpL8xoN0ax@cluster0.oh4q0.mongodb.net/ABC').then(
        console.log("DB Connected"));
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
} 