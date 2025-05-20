import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './Database/dbConfig.js';

dotenv.config();
const app = express();

app.use(express.json()) ;
app.use(cors());

connectDB();

app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to Backend"})
});


const port = process.env.PORT;

app.listen(port,(req,res)=>{
    console.log("Server started");
    
})


