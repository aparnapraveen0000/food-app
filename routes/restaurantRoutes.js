const express = require('express')
const { authUser } = require('../middlewares/authUser.js')
const { authAdmin } = require('../middlewares/authAdmin.js')
const router = express.Router()

// Get all restaurants

router.get("/",authUser)

// Get menu items of a restaurant
router.get("/menu",authUser)

// Add a new restaurant
router.post("/restaurant",authAdmin)

// Update a restaurant's details
router.put("/update",authAdmin)

// Remove a restaurant 
router.delete("/delete",authAdmin)

module.exports=router




	