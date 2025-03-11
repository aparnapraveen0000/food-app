const express = require('express')
const router = express.Router()
const {authUser}=require("../middlewares/authUser.js")
const { authSeller } = require('../middlewares/authSeller.js')

// Create a Menu Item 

router.post("/create",authSeller)

// Get All Menu Items 

router.get("/get_all",authUser)

// Update a Menu Item

router.put("/update",authSeller)

// Delete a Menu Item 

router.delete("/delete",authSeller)




module.exports=router