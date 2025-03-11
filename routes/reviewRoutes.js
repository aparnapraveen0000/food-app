const express = require('express')
const router = express.Router()

// create a review
router.post("/")

// get all the review
router.get("/get")

// update a review
router.put("/update/:reviewId")

// delete a review
router.delete("/delete/:reviewId")

module.exports=router