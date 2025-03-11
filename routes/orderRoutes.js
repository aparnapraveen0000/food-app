const express = require('express')
const router = express.Router()

// create  new order
router.post("/create")

// get all order
router.get("/get")

// Get a single order by id
router.get("/single/:orderId")

// update order by id 
router.put("/update/:orderId")

// delete order by id
router.delete("/delete/:orderId")


module.exports=router