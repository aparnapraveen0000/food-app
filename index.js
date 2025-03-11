const express = require('express')
const app = express()
const{connectDB}=require("./config/db.js")
const {apiRouter}=require("./routes/path.js")
var cookieParser = require('cookie-parser')
const port =process.env.PORT
require('dotenv').config()

connectDB()

app.use(express.json())
app.use(cookieParser())


app.use("/api",apiRouter)

app.all("*",(req,res,next)=>{
  res.status(404).json({message:"end point does not exist"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})