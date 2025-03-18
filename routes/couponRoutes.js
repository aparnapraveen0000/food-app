const express = require('express')
const router = express.Router()
const{authSeller}=require("../middlewares/authSeller.js")
const{authUser}=require("../middlewares/authUser.js")
const{createCoupon, getCoupon,updateCoupon,deleteCoupon}=require("../controllers/couponController.js")

// Create a Coupon 

router.post("/create",authSeller,createCoupon)

// Get allCoupons 

router.get("/get_all",authUser,getCoupon)

// Update a Coupon 

router.put("/update/:couponId",authSeller,updateCoupon)

// Delete a Coupon 

router.delete("/delete/:couponId",authSeller,deleteCoupon)




module.exports=router
  