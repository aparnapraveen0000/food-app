const express = require('express')
const router = express.Router()
// Create a Coupon 

router.post("/create")

// Get All Coupons 

router.get("/get_all")

// Update a Coupon 

router.put("/update/:couponId")

// Delete a Coupon 

router.delete("/delete/:couponId")

// Apply a Coupon 

router.post("/apply/:couponId")


module.exports=router
  