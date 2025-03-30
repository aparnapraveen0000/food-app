const bcrypt = require('bcrypt')
const userModel=require("../model/userModel.js")
const {generateToken}=require("../utils/token.js")

const userSignup=async(req,res,next)=>{
    try {
  // collect user data
   const{name,email,password,mobile,address,confirmPassword,profilePic}=req.body

  //  data validation
  if(!name||!email|| !password||!mobile||!address||!confirmPassword){
   return res.status(400).json({message:"all fields required"})
  }
  //  check if alreary exist

  const userExist=await userModel.findOne({email:email})

  if(userExist){
    return res.status(400).json({message:"this user is alreay exist"})
  }

  // compair password and confir password
  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }
// password hashing
  const hashedPassword = bcrypt.hashSync(password,10)

  // save to db
  const newUser= new userModel({name,email,password:hashedPassword,mobile,address,confirmPassword,profilePic})
  await newUser.save()

  // generate token using id and role

const token=generateToken(newUser._id,"user")
res.cookie("token",token)

res.json({data:newUser,message:"signup success"})

}
    
  catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
        console.log(error)
    }
}

const userLogin=async(req,res,next)=>{
  try{
    // collecting userdata
    const{email,password,confirmPassword}=req.body
     //  data validation
   if(!email|| !password||!confirmPassword){
   return res.status(400).json({message:"all fields required"})
  }

  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }

 // user exist checking
  const userExist=await userModel.findOne({email:email})
  if(!userExist){
    return res.status(404).json({message:" user not found"})
  }

  // password match with db
  const passwordMatch =bcrypt.compareSync(password,userExist.password)
 if(!passwordMatch){
  return res.status(401).json({message:"invalid credentials"})
 }

 if(!userExist.isActive){
  return res.status(404).json({message:" user account is not active"})
 }

  // generate token
  const token=generateToken(userExist._id,"user")
  res.cookie("token",token)
  // to remove password from userExist and send other details to frontend
  
  delete userExist._doc.password
  res.json({data:userExist,message:"login success"})

  }

  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}
}

const userProfile=async (req,res,next)=>{
try{
  const userId=req.user.id
  const userData=await userModel.findById(userId).select("-password")

  res.json({data:userData,message:"user profile fetched"})
  
}catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}

}

const updateUserProfile=async (req,res,next)=>{
try{
  const{name,email,password,mobile,address,confirmPassword,profilePic}=req.body
  const userId=req.user.id
  const userData=await userModel.findByIdAndUpdate(userId,{name,email,password,mobile,address,confirmPassword,profilePic},{new:true})

  res.json({data:userData,message:"user profile updated"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}

}

const userLogout=async (req,res,next)=>{
try{
      res.clearCookie("token")
      res.json({message:"user logout"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}
}

const userDeactivate=async(req,res,next)=>{
  try {
    
    const userId = req.user.id; 

    // Update the isActive status to false
    const user = await userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// check user

const checkUser=async(req,res,next)=>{
  try{
     res.json({message:"user autherized"})
  }
  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
     }
}




module.exports={userSignup,userLogin,userProfile,updateUserProfile,userLogout, userDeactivate,checkUser}