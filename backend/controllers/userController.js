import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login
const loginUser= async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({message:"User doesn't exist"})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

//create token
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register
const registerUser= async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        //email already register
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        //check valid email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters"});
        }

        //hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user= await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})  
    }
    
}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving users" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        await userModel.findByIdAndDelete(id);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting user" });
    }
};


export {loginUser,registerUser};