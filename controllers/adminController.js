const bcrypt = require('bcrypt')
const adminModel=require("../model/adminModel.js")
const {generateToken}=require("../utils/token.js")

const adminSignup=async(req,res,next)=>{
    try {
  // collect admin data
   const{name,email,password,mobile,address,confirmPassword,profilePic}=req.body

  //  data validation
  if(!name||!email|| !password||!mobile||!address||!confirmPassword){
   return res.status(400).json({message:"all fields required"})
  }
//    check if alreary exist

  const adminExist=await adminModel.findOne({email:email})

  if(adminExist){
    return res.status(400).json({message:"this admin is alreay exist"})
  }

  // compair password and confirm password
  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }
// password hashing
  const hashedPassword = bcrypt.hashSync(password,10)

  // save to db
  const newAdmin= new adminModel({name,email,password:hashedPassword,mobile,address,confirmPassword,profilePic})
  await newAdmin.save()

  // generate token using id and role

const token=generateToken(newAdmin._id,"admin")
res.cookie("token",token)

res.json({data:newAdmin,message:"signup success"})

}
    
  catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
        console.log(error)
    }
}

const adminLogin=async(req,res,next)=>{
  try{
    // collecting admindata
    const{email,password,confirmPassword}=req.body
     //  data validation
   if(!email|| !password||!confirmPassword){
   return res.status(400).json({message:"all fields required"})
  }

  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }

 // admin exist checking
  const adminExist=await adminModel.findOne({email:email})
  if(!adminExist){
    return res.status(404).json({message:" admin not found"})
  }

  // password match with db
  const passwordMatch =bcrypt.compareSync(password,adminExist.password)
 if(!passwordMatch){
  return res.status(401).json({message:"invalid credentials"})
 }

 if(!adminExist.isActive){
  return res.status(404).json({message:" admin account is not active"})
 }

  // generate token
  const token=generateToken(adminExist._id,"admin")
  res.cookie("token",token)
  // to remove password from adminExist and send other details to frontend
  
  delete adminExist._doc.password
  res.json({data:adminExist,message:"login success"})

  }

  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}
}

const adminProfile=async (req,res,next)=>{
try{
  const adminId=req.admin.id
  const adminData=await adminModel.findById(adminId)

  res.json({data:adminData,message:"admin profile fetched"})
  
}catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}

}

const updateAdminProfile=async (req,res,next)=>{
try{
  const{name,email,password,mobile,address,confirmPassword,profilePic}=req.body
  const adminId=req.admin.id
  const adminData=await adminModel.findByIdAndUpdate(adminId,{name,email,password,mobile,address,confirmPassword,profilePic},{new:true})

  res.json({data:adminData,message:"admin profile updated"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}

}

const adminLogout=async (req,res,next)=>{
try{
      res.clearCookie("token")
      res.json({message:"admin logout"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}
}


const checkAdmin=async(req,res,next)=>{
  try{
     res.json({message:"admin autherized"})
  }
  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
     }
}





module.exports={adminSignup,adminLogin,adminProfile,updateAdminProfile,adminLogout,checkAdmin}