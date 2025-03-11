var jwt = require('jsonwebtoken')

const authUser=(req,res,next)=>{
    try{

        // collect token from cookies
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"user  not autherized"})
        }
        // decode token
        const decodedToken = jwt.verify(token,process.env.JWT_KEY)
        if(!decodedToken){
            return res.status(401).json({message:"user  not autherized"})
           
        }
        
        req.user= decodedToken
        next()

    }
    catch(error){
        console.log(error)
        res.status(error.statusCode || 500).json({message:error.message||"internal server error"})

    }
}

module.exports={authUser}