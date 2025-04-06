// const PaymentModel=require("../model/paymentModel.js")
// const Razorpay = require("razorpay");
// const dotenv = require("dotenv");
// const crypto = require("crypto");
// const cartModel = require("../model/cartModel.js");
// const orderModel = require("../model/orderModel.js")


// dotenv.config();
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

// const initiatePayment = async (req, res) => {
//   try {
//     const customerId = req.user.id;  // Changed from userId
//     const { orderId } = req.params;

//     const existingOrder = await OrderModel.findById(orderId);
//     if (!existingOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     if (existingOrder.state !== "pending") {  // Changed from status
//       const stateMessages = {  // Changed from statusMessages
//         cancelled: "Cannot proceed with payment for a cancelled order",
//         delivered: "Order has already been delivered",
//         default: "Payment has already been processed. Order is on the way.",
//       };
//       return res.status(400).json({
//         message: stateMessages[existingOrder.state] || stateMessages.default,
//       });
//     }

//     const total = existingOrder.finalPrice * 100;  // Changed from totalAmount
//     const razorpayOrder = await razorpayInstance.orders.create({
//       amount: total,  // Changed from amount to match parameter name
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         orderId: orderId.toString(),
//         customerId: customerId.toString(),  // Changed from userId
//       },
//     });

//     const paymentRecord = new PaymentModel({
//       orderId,
//       customer: customerId,  // Changed from user
//       total: existingOrder.finalPrice,  // Changed from amount
//       state: "initiated",  // Changed from status: "pending" to match schema enum
//       referenceId: razorpayOrder.id,  // Changed from transactionId to match schema
//     });

//     const storedPayment = await paymentRecord.save();
//     res.status(201).json({
//       message: "Payment process initiated successfully",
//       payment: storedPayment,
//       razorpayOrder,
//     });
//   } catch (error) {
//     console.error("Error in initiatePayment:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const confirmPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature === razorpay_signature) {
//       const paymentEntry = await PaymentModel.findOneAndUpdate(
//         { referenceId: razorpay_order_id },  // Changed from transactionId
//         { state: "successful" },  // Changed from status: "success" to match schema enum
//         { new: true }
//       );

//       if (!paymentEntry) {
//         return res.status(404).json({ message: "Payment record not found" });
//       }

//       const updatedOrder = await OrderModel.findOneAndUpdate(
//         { _id: paymentEntry.orderId },
//         { state: "confirmed" },  // Changed from status
//         { new: true }
//       );

//       if (!updatedOrder) {
//         return res.status(404).json({ message: "Order record not found" });
//       }

//       const updatedCart = await CartModel.findOneAndUpdate(
//         { _id: updatedOrder.cartId },
//         { cartStatus: "ordered" },  // Note: cartStatus kept as is since it's from CartModel
//         { new: true }
//       );

//       if (!updatedCart) {
//         return res.status(404).json({ message: "Cart record not found" });
//       }

//       return res.status(200).json({ message: "Payment verification successful" });
//     } else {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }
//   } catch (error) {
//     console.error("Error in confirmPayment:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// const fetchPayments = async (req, res) => {
//   try {
//     const paymentList = await PaymentModel.find().populate("customer");  // Changed from user
//     return res.status(200).json({
//       message: "Payments retrieved successfully",
//       data: paymentList,
//     });
//   } catch (error) {
//     console.error("Error in fetchPayments:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// module.exports = {
//   initiatePayment,
//   confirmPayment,
//   fetchPayments
// };