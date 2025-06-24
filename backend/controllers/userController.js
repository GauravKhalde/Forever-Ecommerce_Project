import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { Model } from 'mongoose';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, resp) => {
try{
    const{email,password}= req.body;
    const user = await userModel.findOne({email})

    if(!user){
        return resp.json({success:false,message:"user  doesn't exists"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        const token=createToken(user._id)
        resp.json({success:true,token})
    }
    else{
        resp.json({success:false,message:"Invalid credentials"})

    }

}
catch(error){
 console.log(error);
resp.json({ success: false, message: error.message })
}

}





//Route for user Registration
const registerUser = async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email })
        if (exists) {
            return resp.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return resp.json({ success: false, message: "Please Enter a valid email" })
        }
        if (password.length < 8) {
            return resp.json({ success: false, message: "Please Enter a Strong 8 digit password " })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        resp.json({ success: true, token })
    }
    catch (err) {
        console.log(error);
        resp.json({ success: false, message: error.message })
    }
}


//Route for admin login
const adminLogin = async (req, resp) => {
try{
  const{email,password}=req.body
  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    // const token = jwt.sign(email+password,process.env.JWT_SECRET);
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);


    resp.json({success:true,token})
  }
  else{
    resp.json({success:false,message:"Invalid credentials"})
  }
}catch(err){
console.log(error);
resp.json({ success: false, message: error.message })
}

}

export { loginUser, registerUser, adminLogin }
