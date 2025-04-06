// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//     purchaseId: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Purchase', 
//         required: true 
//     },
//     customer: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Customer',
//         required: true 
//     },
//     total: { 
//         type: Number, 
//         required: true 
//     },
//     state: { 
//         type: String,
//         enum: ['initiated', 'successful', 'unsuccessful'],
//         default: 'initiated' 
//     },
//     referenceId: { 
//         type: String 
//     },
//     timestamp: { 
//         type: Date,
//         default: Date.now 
//     }
// });

// const Transaction = mongoose.model('Transaction', transactionSchema);
// module.exports = Transaction;