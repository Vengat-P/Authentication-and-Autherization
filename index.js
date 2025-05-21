import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './Database/dbConfig.js';

//config dotenv file to access it
dotenv.config();
//initialize express js
const app = express();
//apply default middlewares
app.use(express.json()) ;
app.use(cors());
// connect DB by calling the function of connect with connection string
connectDB();
//default route 
app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to Backend"})
});
//initialize port
const port = process.env.PORT;
//initialize server
app.listen(port,(req,res)=>{
    console.log("Server started");
    
});


