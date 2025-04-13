const couponModel=require("../model/couponModel.js")

const createCoupon=async (req, res,next) => {
    try {
        const { code, discountValue, minOrderAmount, validFrom, validTo, couponIsActive } = req.body;

        const existingCoupon = await couponModel.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: 'Coupon code already exists' });
        }

        const newCoupon = new couponModel({ code, discountValue, minOrderAmount, validFrom, validTo, couponIsActive });
        await newCoupon.save();

        res.status(201).json({ message: 'Coupon created successfully', data: newCoupon });
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const getCoupon=async (req, res,next) => {
    try {
        const coupons = await couponModel.find();
        return res.status(200).json({data:coupons,message:"all coupon get successfully"});
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const updateCoupon=async (req, res,next) => {
    try {
        const{couponId}=req.params
        const { code, discountValue, minOrderAmount, validFrom, validTo, couponIsActive } = req.body;

        const updateCoupon=await couponModel.findByIdAndUpdate(couponId,{ code, discountValue, minOrderAmount, validFrom, validTo, couponIsActive},{new:true})
        if(!updateCoupon){
            return res.status(404).json({ message: 'coupon not found' });  
        }
        res.status(200).json({data:updateCoupon,message:"coupon updated successfully"})
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
    }
}

const deleteCoupon=async (req, res,next) => {
try {
    const{couponId}=req.params
    
    const deleteCoupon=await  couponModel.findByIdAndDelete(couponId)

    if(!deleteCoupon){
      return  res.status(404).json({message:"coupon not found"})
    } 
    res.status(200).json({data:deleteCoupon,message:"coupon deleted successfully"})
        
    
} catch (error) {
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"})
}
}

const getAllCouponsForAdmin = async (req, res, next) => {
    try {
      const coupons = await couponModel.find();
      return res.status(200).json({ data: coupons, message: "All coupons fetched by admin successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
  };
  
  
  

module.exports={createCoupon, getCoupon,updateCoupon,deleteCoupon,getAllCouponsForAdmin}