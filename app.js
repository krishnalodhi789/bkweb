require('dotenv').config({path:"./config.env"})
const express = require("express");
const app = express();
const router = require("./routers/router");
const cookieParser = require("cookie-parser");
require("./db/connect");
const path = require("path")


const port = process.env.PORT || 5000




//Using Cookie-Parser ---------------
app.use(cookieParser())

//Middleware for gating Data form Post method ------------------ 
app.use(express.json())
app.use(express.urlencoded({extended : false}));





// Using Router -----------------------
app.use("/api", router);

if(process.env.NODE_ENV == "production"){
	app.use(express.static(path.join(__dirname,"client/build")))
}

app.listen(port,()=>{
	console.log(`Listen from port : ${port}`);
})