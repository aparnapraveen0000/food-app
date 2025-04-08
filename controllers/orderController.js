const express = require('express')
const router = express.Router()
const orderModel = require("../model/orderModel.js")

// Create a new order
const createOrder= async (req, res,next) => {
    try {
        const { userId, orderItems, discount,paymentStatus} = req.body

        // Calculate total price
        const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) - discount;

        // Ensure total price is not negative
        if (totalPrice < 0) {
            return res.status(400).json({ message: "Invalid discount value." })
        }

        const newOrder = new orderModel({
            userId,
            orderItems,
            discount,
            totalPrice,
            paymentStatus
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully",data:newOrder})

    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const getOrder = async (req, res) => {
    try {
      console.log("User from token:", req.user); //  log user
      const orders = await orderModel.find({ userId: req.user._id })
        .populate("userId", "username email")
        .populate("orderItems.itemNameId", "name price");
  
      console.log("Orders found:", orders); //  log orders
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error in getOrder:", error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };
  
  

// Get a single order by ID
const getSingleOrder= async (req, res,next) => {
    try {

        const {orderId}=req.params
        const order = await orderModel.findById(orderId).populate("userId").populate("orderItems.itemNameId")
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        res.status(200).json({data:order,message:"order found successfully"})
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }  
    
}

// Update an order by ID
const updateOrder=async (req, res,next) => {
    try {
        const {orderId}=req.params
        const { userId, orderItems, discount,paymentStatus} = req.body

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId,{ userId, orderItems, discount,paymentStatus},{ new: true })
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" })
        }
        res.status(200).json({ message: "Order updated successfully", data: updatedOrder })
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"}) 
    }
}

// Delete an order by ID
const deleteOrder= async (req, res,next) => {
    try {
        const {orderId}=req.params

        const deletedOrder = await orderModel.findByIdAndDelete(orderId)
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" })
        }

        res.status(200).json({data:deletedOrder,message: "Order deleted successfully" })
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"}) 
    }

    
}

module.exports ={deleteOrder,updateOrder,getOrder,createOrder,getSingleOrder}
