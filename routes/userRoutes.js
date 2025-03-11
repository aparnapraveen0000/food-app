const express = require('express')
const router = express.Router()
const{authUser}=require("../middlewares/authUser.js")
const{authAdmin}=require("../middlewares/authAdmin.js")
const {userSignup,userLogin,userProfile,updateUserProfile,userLogout,userDeactivate,checkUser}=require("../controllers/userController.js")

// User Authentication
router.post("/signup",userSignup)

router.post("/login",userLogin)

router.post("/logout",userLogout)

// User Profile Management

router.get("/getProfile",authUser,userProfile)

router.put("/updateProfile",authUser,updateUserProfile)

router.put("/deactivate",authAdmin,userDeactivate)

router.get("/check",authUser,checkUser)


module.exports=router

