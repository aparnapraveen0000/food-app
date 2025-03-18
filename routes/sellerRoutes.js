const express = require('express')
const router = express.Router()
const {sellerSignup,sellerLogin,sellerProfile,updateSellerProfile,sellerLogout,sellerDeactivate,checkSeller}=require("../controllers/sellerController.js")
const {authSeller}=require("../middlewares/authSeller.js")

router.post("/signup",sellerSignup)

router.post("/login",sellerLogin)

router.get("/profile",authSeller,sellerProfile)

router.put("/update",authSeller,updateSellerProfile)

router.post("/logout",sellerLogout)

router.put("/deactivate",authSeller,sellerDeactivate)

router.get("/check",authSeller,checkSeller)

module.exports=router