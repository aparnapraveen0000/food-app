const menuModel=require( "../model/menuModel.js")
const cloudinary=require("../config/cloudinary.js")

const getMenu=async(req,res,next)=>{
    try {
        // to get all menu items
        const menuItems=await menuModel.find().select("-description -category")
        res.status(200).json({data:menuItems, message:"Menu items retrieved successfully" })
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const getSingleItem=async(req,res,next)=>{
    try {

        // collect the id of the single item
        const {itemId}=req.params
        // find the item
        const singleItem=await menuModel.findById(itemId)
        //  checking the  item
        if (!singleItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success:true, data:singleItem, message:"single items retrieved successfully" })
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const createItem=async(req,res,next)=>{
    try {

        // collect data
        const { itemName,description, price,category,itemAvailability, restaurant,foodImage}=req.body
        //   checking the data
        if(! itemName ||!description || !price ||!category ||!itemAvailability||!restaurant){
            return res.status(400).json({message:"all fields required"})
           }

           const cloudinaryPic = await cloudinary.uploader.upload(req.file.path);
           console.log(cloudinaryPic)

        //   creating a new item
        const createItem=await menuModel.create({ itemName,description, price,category,itemAvailability,restaurant,foodImage:cloudinaryPic.url})
        createItem.save()
        
        res.json({ success:true, data:createItem , message:" items created successfully" })
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const updateItem=async(req,res,next)=>{
    try {
        // collect the all data and the id of item that need to be updated
        const { itemName,description, price,category,itemAvailability,restaurant,foodImage}=req.body
             const {itemId}=req.params

             
           const cloudinaryPic = await cloudinary.uploader.upload(req.file.path);
           console.log(cloudinaryPic)

            //  updating the new value
        const updateItem=await menuModel.findByIdAndUpdate(itemId,{ itemName,description, price,category,itemAvailability,restaurant,foodImage:cloudinaryPic.url},{new:true})
        //    checking about the updation
        if (!updateItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, data: updateItem, message: "Updated item successfully" });
        
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const deleteItem=async(req,res,next)=>{
    try {
        // collecting the id of item want to be delete
        const {itemId}=req.params

        // deleteing the item
        const deleteItem=await menuModel.findByIdAndDelete(itemId,{new:true})
        //   checking whether it is deleted
        if (!deleteItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, data: deleteItem, message: "delete item successfully" });
        
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}



module.exports={ getMenu,getSingleItem,createItem,updateItem,deleteItem}