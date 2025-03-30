const express = require('express')
const router = express.Router()
const {authUser}=require("../middlewares/authUser.js")
const { authSeller } = require('../middlewares/authSeller.js')
const { upload} = require('../middlewares/multer.js')


const{getMenu,getSingleItem,createItem,updateItem,deleteItem}=require("../controllers/menuController.js")

// Create a Menu Item 

router.post("/create",authSeller, upload.single("foodImage"),createItem)

// Get All Menu Items 

router.get("/get_all", getMenu)

//  Get single menu Items 

router.get("/singleItem/:itemId",authUser,getSingleItem )


// Update a Menu Item

router.put("/update/:itemId",authSeller,upload.single("foodImage"),updateItem)

// Delete a Menu Item 

router.delete("/delete/:itemId",authSeller,deleteItem)




module.exports=router