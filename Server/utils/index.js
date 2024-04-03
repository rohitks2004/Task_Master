import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const url="mongodb+srv://sakthi:Vicky07@cluster0.ggmamcl.mongodb.net/taskDB?retryWrites=true&w=majority";

const dbConnection =async ()=>{
    try {
        await mongoose.connect(url);
        console.log("DB connected");
    } catch (error) {
        console.log("DB error"+ error);
    }
}

export default dbConnection;

export const createJWT = (res,userId)=>{
const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1d',

});

res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV !=="development",
    sameSite:"strict",// prevent CSRF attacks
    maxAge:1*24*60*60*1000,//! day

})
}