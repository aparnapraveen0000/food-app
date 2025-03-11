const express = require('express')
const router = express.Router()

// Get payment status
router.get("/status/:id")

// Process refunds
router.post("/refund")

module.exports=router