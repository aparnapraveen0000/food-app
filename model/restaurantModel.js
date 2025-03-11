const mongoose =require ('mongoose')
const { Schema } = mongoose;

const restaurantSchema= new Schema({
      name:{
        type:String,
        required:true,
        unique:true,
      },
      description:{
        type:String,
        required:true,
      },
      location:{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
            
        },
        state:{
            type:String,
            required:true,
        },
        pincode:{
            type:Number,
            required:true,
        }
      },
      rating:{
        type:Number,
        min:0,
        max:5,
      },
      hotelImage:{
        type:String,
    
      }
},
{timestamps:true}
)

const restaurantModel=mongoose.model('restaurant', restaurantSchema)
module.exports=restaurantModel

