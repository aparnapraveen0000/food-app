const mongoose =require ('mongoose')
const { Schema } = mongoose;

const menuSchema= new Schema({
    itemName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    itemAvailability:{
        type:Boolean,
        required:true,
    },
    foodImage:{
        type:String,
    }

},{timestamps:true})


const menuModel=mongoose.model('menu', menuSchema)
module.exports=menuModel