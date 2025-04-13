const express = require('express')
const router = express.Router()
const{authSeller}=require("../middlewares/authSeller.js")
const{authUser}=require("../middlewares/authUser.js")
const{authAdmin}=require("../middlewares/authAdmin.js")
const{deleteOrder,updateOrder,getOrder,createOrder,getSingleOrder,GetAdminOrders}=require("../controllers/orderController.js")


// create  new order
router.post("/create",authUser,createOrder)

// get all order
router.get("/get",authUser,getOrder)

// For admins to fetch all orders
router.get("/admin/get", authAdmin,GetAdminOrders);

// Get a single order by id
router.get("/single/:orderId",authSeller,authAdmin,getSingleOrder)

// update order by id 
router.put("/update/:orderId",authSeller,authAdmin,updateOrder)

// delete order by id
router.delete("/delete/:orderId",authSeller,authAdmin,deleteOrder)


module.exports=router