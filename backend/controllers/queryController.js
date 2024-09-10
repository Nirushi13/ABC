import queryModel from '../models/QueryModel.js' 
import nodemailer from 'nodemailer';
import { Parser } from 'json2csv';

export const submitQuery = async (req, res) => {
  const { name, email, message } = req.body; 

  try {
    const newQuery = new queryModel({ name, email, message }); 
    await newQuery.save(); 
    res.json({success:true,message:"Query Saved"}); 
  } catch (error) {
    res.json({success:false,message: 'Server Error'}); 
  }
};

// Function to get all queries
export const getQueries = async (req, res) => {
  try {
    const queries = await queryModel.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const replyToQuery = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    console.log('Received reply for query ID:', id);
    console.log('Response content:', response);

    const query = await queryModel.findById(id);
    if (!query) {
      console.log('Query not found');
      return res.status(404).json({ message: 'Query not found' });
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    // Send the email response
    await transporter.sendMail({
      to: query.email,
      subject: 'Response to Your Query',
      text: response,
    });

    res.json({ message: 'Response sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getQueryById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await queryModel.findById(id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    res.json({ success: true, data: query });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export const generateQueryReport = async (req, res) => {
  try {
    const queries = await queryModel.find();
    if (!queries || queries.length === 0) {
      return res.status(404).json({ message: 'No queries found' });
    }
   
    const transformedQueries = queries.map(query => ({
      name: query.name,
      email: query.email,
      message: query.message,
      dateSubmitted: new Date(query.createdAt).toLocaleDateString(), 
    }));

    
    const parser = new Parser();
    const csv = parser.parse(transformedQueries);

    // Set headers for file attachment
    res.header('Content-Type', 'text/csv');
    res.attachment('queries_report.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error generating query report:', error);
    res.status(500).json({ error: 'An error occurred while generating the report' });
  }
};

