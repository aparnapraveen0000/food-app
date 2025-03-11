const express = require('express')
const router = express.Router()

// add item to cart
router.post("/add")

// get item from cart
router.get("/get")

// update quantity of item
router.put("/update/:itemId")

// delete item from cart
router.delete("/delete/:itemId")

// clear the cart
router.delete("/clear")

module.exports=router
