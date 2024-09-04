import foodModel from "../models/foodModel.js";
import fs from 'fs'



//add food item
const addFood= async(req,res)=>{
    let image_filename=`${req.file.filename}`;

    const food= new foodModel({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        image:image_filename,
    })
    
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// Get all foods with optional search
const listFood = async (req, res) => {
    const { search } = req.query; 

    try {
        let query = {};
        
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },        
                    { category: { $regex: search, $options: 'i' } },     
                    { description: { $regex: search, $options: 'i' } } 
                ]
            };
        }

        const foods = await foodModel.find(query); 
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


//delete foods
const deleteFood= async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        console.log(req.body);
        
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Deleted"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}



export{addFood,listFood,deleteFood}