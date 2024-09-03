import mongoose from 'mongoose';

// Define the schema for the query without the status field
const querySchema = new mongoose.Schema({
  name: { type: String, required: true },      
  email: { type: String, required: true },    
  message: { type: String, required: true },   
  date: { type: Date, default: Date.now },     
});

const queryModel = mongoose.models.query || mongoose.model("query", querySchema);

export default queryModel;
