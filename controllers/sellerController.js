const bcrypt = require("bcryptjs");
const sellerModel=require("../model/sellerModel.js")
const {generateToken}=require("../utils/token.js")

const sellerSignup=async(req,res,next)=>{
    try {
  // collect seller data
   const{name,email,password,mobile,address,confirmPassword,businessName,profilePic}=req.body

  //  data validation
  if(!name||!email|| !password||!mobile||!address||!confirmPassword||!businessName){
   return res.status(400).json({message:"all fields required"})
  }
  //  check if alreary exist

  const sellerExist=await sellerModel.findOne({email:email})

  if(sellerExist){
    return res.status(400).json({message:"this seller is alreay exist"})
  }

  // compair password and confir password
  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }
// password hashing
  const hashedPassword = bcrypt.hashSync(password,10)

  // save to db
  const newSeller= new sellerModel({name,email,password:hashedPassword,mobile,address,confirmPassword,businessName,profilePic})
  await newSeller.save()

  // generate token using id and role

const token=generateToken(newSeller._id,"seller")
res.cookie("token",token)

res.json({data:newSeller,message:"signup success"})

}
    
  catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
        console.log(error)
    }
}

const sellerLogin=async(req,res,next)=>{
  try{
    // collecting sellerdata
    const{email,password,confirmPassword}=req.body
     //  data validation
   if(!email|| !password||!confirmPassword){
   return res.status(400).json({message:"all fields required"})
  }

  if(password!==confirmPassword){
    return res.status(400).json({message:"password is not same"}) 
  }

 // seller exist checking
  const sellerExist=await sellerModel.findOne({email:email})
  if(!sellerExist){
    return res.status(404).json({message:" seller not found"})
  }

  // password match with db
  const passwordMatch =bcrypt.compareSync(password,sellerExist.password)
 if(!passwordMatch){
  return res.status(401).json({message:"invalid credentials"})
 }

 if(!sellerExist.isActive){
  return res.status(404).json({message:" seller account is not active"})
 }

  // generate token
  const token=generateToken(sellerExist._id,"seller")
  res.cookie("token",token)
  // to remove password from sellerExist and send other details to frontend
  
  delete sellerExist._doc.password
  res.json({data:sellerExist,message:"login success"})

  }

  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}
}

const sellerProfile=async (req,res,next)=>{
try{
  const sellerId=req.seller.id
  const sellerData=await sellerModel.findById(sellerId).select("-password")

  res.json({data:sellerData,message:"seller profile fetched"})
  
}catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    console.log(error)

}

}

const updateSellerProfile=async (req,res,next)=>{
try{
  const{name,email,password,mobile,address,confirmPassword,businessName,profilePic}=req.body
  const sellerId=req.seller.id
  const sellerData=await sellerModel.findByIdAndUpdate(sellerId,{name,email,password,mobile,address,confirmPassword,businessName,profilePic},{new:true})

  res.json({data:sellerData,message:"seller profile updated"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}

}

const sellerLogout=async (req,res,next)=>{
try{
      res.clearCookie("token")
      res.json({message:"seller logout"})
}
catch (error) {
  res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
  console.log(error)

}
}
  

const sellerDeactivate=async(req,res,next)=>{
  try {
    
    const sellerId = req.seller.id; 

    // Update the isActive status to false
    const seller = await sellerModel.findByIdAndUpdate(sellerId, { isActive: false }, { new: true });

    if (!seller) {
      return res.status(404).json({ message: "seller not found" });
    }

    res.json({ message: "Account deactivated successfully", seller });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


const checkSeller=async(req,res,next)=>{
  try{
     res.json({message:"seller autherized"})
  }
  catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
     }
}


module.exports={sellerSignup,sellerLogin,sellerProfile,updateSellerProfile,sellerLogout,sellerDeactivate,checkSeller}