const express = require('express')
const router = express.Router()
const {authAdmin}=require("../middlewares/authAdmin.js")
const {adminSignup,adminLogin,adminProfile,updateAdminProfile,adminLogout,checkAdmin}=require("../controllers/adminController.js")

//  admin signup
router.post("/signup",adminSignup)

// admin login
router.post("/login",adminLogin)

// admin logout
router.post("/logout",adminLogout)

//  to get admin profile
router.get("/profile",authAdmin,adminProfile)  

// update admin profile                
router.put("/update",authAdmin,updateAdminProfile)

// check admin
router.get("/check",authAdmin,checkAdmin)

// item management

// get all item
router.get("/getItem")

// add item
router.post("/add")

// update item
router.put("/update/:itemId")

// delete item
router.delete("/delete/:itemId")


//  User Management

// get all user 
router.get("/getUser")

// delete a user by id
router.delete("/delete/:userId")


// order management

// get all order
router.get("/getOrder")

// update a order
router.put("/update/:orderId")

// delete a order
router.delete("/delete/:orderId")

// restaurant management

// add a new restaurant
router.post("/create")

// Update restaurant details
router.put("/edit/:resId")

// Delete a restaurant

router.delete("/remove/:resId")




 module.exports=router

