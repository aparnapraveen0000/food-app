const express = require('express')
const { authUser } = require('../middlewares/authUser.js')
const { authSeller } = require('../middlewares/authSeller.js')
const { authAdmin } = require('../middlewares/authAdmin.js')
const {getRestaurant,postRestaurant, updateRestaurant,deleteRestaurant,AllRestaurant,EditRestaurant,RemoveRestaurant,AddRestaurant,getMenuOfRestaurant,getRestaurantsByMenuItem}=require("../controllers/restaurantController.js")
const router = express.Router()

// Get all restaurants

router.get("/",authAdmin,getRestaurant)

// Get menu items of a restaurant
router.get("/menu/:restaurantId",authUser, getMenuOfRestaurant)

// Add a new restaurant
router.post("/restaurant",authAdmin,postRestaurant)

// seller need to get all restaurant
router.get("/allres",authSeller,AllRestaurant)

// seller need to Add a new restaurant
router.post("/addres",authSeller,AddRestaurant)

// seller need to Update a restaurant's details
router.put("/editres/:restaurantId",authSeller,EditRestaurant)

//seller need to Remove a restaurant 
router.delete("/removeres/:restaurantId",authSeller,RemoveRestaurant)


// Update a restaurant's details
router.put("/update/:restaurantId",authSeller, authAdmin, updateRestaurant)

// Remove a restaurant 
router.delete("/delete/:restaurantId",authAdmin,authSeller, deleteRestaurant)

router.get("/:restaurantId", getRestaurantsByMenuItem);


module.exports=router




	