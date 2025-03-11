const mongoose =require ('mongoose')
const { Schema } = mongoose;

const cartItemSchema= new Schema({
    
   itemName:{
    type:String,
    required:true,
    
   },
   price:{
    type:Number,
    required:true,

   },
   quantity:{
    type:Number,
    required:true,
   },

})

const totalPriceSchema=new Schema({

    itemTotal:{
    type:Number,
    required:true,
},
deliveryFee:{
    type:Number,
    required:true,
},
platformFee:{
    type:Number,
    required:true,

},
gstAndRescharge:{
    type:Number,
    required:true,
},
discount:{
    type:Number,
    required:true,
},
coupon:{
    type:Number,
    required:true,
}


})

const cartSchema=new Schema({
 item:[cartItemSchema],
 totalPrice:totalPriceSchema,
},{timestamps:true})

const cartModel=mongoose.model('cart', cartSchema)
module.exports=cartModel