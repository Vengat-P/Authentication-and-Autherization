import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import users from '../Models/user.schema.js'


dotenv.config();

export const userMiddleware = async (req,res,next)=>{
    // using bearer token method 
    const token = req.headers.authorization?.split(' ')[1] 
    if(!token){
        return res.status(404).json({message:"Token Missing"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.user = decoded;
        // console.log(req.user);
        
        next();
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}