const express = require('express')
const router = express.Router()
const{authSeller}=require("../middlewares/authSeller.js")
const{authUser}=require("../middlewares/authUser.js")
const{authAdmin}=require("../middlewares/authAdmin.js")

const{createCoupon, getCoupon,updateCoupon,deleteCoupon,getAllCouponsForAdmin}=require("../controllers/couponController.js")

// Create a Coupon 

router.post("/create",authSeller,authAdmin,createCoupon)

// Get allCoupons 

router.get("/get_all",authUser,getCoupon)
// Admin-only coupon fetch
router.get("/admin/get_all", authAdmin, getAllCouponsForAdmin);

// Update a Coupon 

router.put("/update/:couponId",authSeller,authAdmin,updateCoupon)

// Delete a Coupon 

router.delete("/delete/:couponId",authSeller,authAdmin,deleteCoupon)




module.exports=router
  