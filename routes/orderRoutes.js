const express = require('express')
const router = express.Router()
const{authSeller}=require("../middlewares/authSeller.js")
const{authUser}=require("../middlewares/authUser.js")
const{deleteOrder,updateOrder,getOrder,createOrder,getSingleOrder}=require("../controllers/orderController.js")


// create  new order
router.post("/create",authUser,createOrder)

// get all order
router.get("/get",authSeller,getOrder)

// Get a single order by id
router.get("/single/:orderId",authSeller,getSingleOrder)

// update order by id 
router.put("/update/:orderId",authSeller,updateOrder)

// delete order by id
router.delete("/delete/:orderId",authSeller,deleteOrder)


module.exports=router