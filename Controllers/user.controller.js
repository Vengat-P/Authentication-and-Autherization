import users from "../Models/user.schema.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


dotenv.config();

// user registration or signup function 
export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new users({ username, email, password: hashPassword });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user login function

export const userLogin = async (req,res) =>{
    try {
        const {email,password}= req.body  
        const user = await users.findOne({email})
        if(!user){
            res.status(404).json({message:"User Not Found Kindlly Signup"})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
           res.status(404).json({message:"Invalid Password"}) 
        }
        const token = jwt.sign({_id:user._id },process.env.JWT_SECRETKEY , {expiresIn: "1h",})
        user.token = token 
        await user.save();
        res.status(200).json({message:"User Logged In Successfully", token: token })
    } catch (error) {
       res.status(500).json({ message: error.message }); 
    }
}
