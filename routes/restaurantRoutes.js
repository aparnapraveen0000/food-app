const express = require('express')
const { authUser } = require('../middlewares/authUser.js')
const { authSeller } = require('../middlewares/authSeller.js')
const { authAdmin } = require('../middlewares/authAdmin.js')
const {getRestaurant,postRestaurant, updateRestaurant, deleteRestaurant, getMenuOfRestaurant,getRestaurantsByMenuItem}=require("../controllers/restaurantController.js")
const router = express.Router()

// Get all restaurants

router.get("/",authUser,getRestaurant)

// Get menu items of a restaurant
router.get("/menu/:restaurantId",authUser, getMenuOfRestaurant)

// Add a new restaurant
router.post("/restaurant",authAdmin,postRestaurant)

// Update a restaurant's details
router.put("/update/:restaurantId",authSeller, updateRestaurant)

// Remove a restaurant 
router.delete("/delete/:restaurantId",authAdmin, deleteRestaurant)

router.get("/menu-item/:itemId", getRestaurantsByMenuItem);


module.exports=router




	