const restaurantModel=require( "../model/restaurantModel.js")
const menuModel=require( "../model/menuModel.js")

const getRestaurant=async(req,res,next)=>{
try {
    // to get all restaurants
    const restaurantList=await restaurantModel.find().select("-description")
    res.status(200).json({data:restaurantList,message:"restaurant list is successfully fetched"})
    
} catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    
}
}

const postRestaurant=async(req,res,next)=>{
    try {
        //    collect all data
        const{name,description,location, rating}=req.body

            //  check all the fields are fuilled
        if(!name||!description||!location?.address||!location?.city||!location?.state||!location?.pincode ||!rating){
            res.status(400).json({message:"all fields are required"})
        }
        // adding new restaurant
        const postRestaurant=await restaurantModel.create({name,description,location, rating})
        res.status(201).json({data:postRestaurant,message:"restaurant successfully created"})
        
    } catch (error) {
            res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
        
    }
    }


    const updateRestaurant=async(req,res,next)=>{
        try {
            //    collect all data
            const{name,description,location, rating}=req.body
            
            // getting id of restaurant
            const {restaurantId}=req.params
    
            //  updating restaurant details
            const updateRestaurant=await restaurantModel.findByIdAndUpdate(restaurantId,{name,description,location, rating},{new:true})

            //   checking the status of updation
            if (!updateRestaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }
            res.status(200).json({data:updateRestaurant,message:"restaurant details updated"})
            
        } catch (error) {
                res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
            
        }
        }


        const deleteRestaurant=async(req,res,next)=>{
            try {
                
                // getting id of restaurant
                const {restaurantId}=req.params
        
                //  delete restaurant 
                const deleteRestaurant=await restaurantModel.findByIdAndDelete(restaurantId)

                // checking about the delete status
                if (!deleteRestaurant) {
                    return res.status(404).json({ message: "Restaurant not found" });
                }
        
                res.status(200).json({data:deleteRestaurant,message:"restaurant deleted"})
                
            } catch (error) {
                    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
                
            }
            }

            const getMenuOfRestaurant=async(req,res,next)=>{
                try {
                  
                    // getting id of restaurant
                    const {restaurantId}=req.params
            
                    // Fetch menu items from the database
              const menuItems = await menuModel.find({ restaurant: restaurantId }).populate("restaurant")
                    // checking for menu list
                if (!menuItems.length) {
                return res.status(404).json({ message: "No menu items found for this restaurant" })
                  }

                    res.status(200).json({ data: menuItems, message: "Menu items retrieved successfully" })
        
                 
                } catch (error) {
                        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
                    
                }
                }

module.exports={getRestaurant,postRestaurant, updateRestaurant, deleteRestaurant, getMenuOfRestaurant}