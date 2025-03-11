const mongoose=require('mongoose')
const { Schema } = mongoose;

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    totalAmount:{
        type:Number,
        required:true,
        min:0,
    },
    paymentMethod:{
        type:String,
        enum:['credit_card','UPI', 'GPay','cash_on_delivery'],
        required:true,
    },
    status:{
        type:String,
        enum:['pending','completed','failed'],
        default:'pending',
        required:true,
    },
    transactionId:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    }


},{timestamps:true})
const paymentModel = mongoose.model('payment', paymentSchema)
module.exports=paymentModel