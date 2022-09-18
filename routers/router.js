const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Users = require("../db/model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const authorization = require("../Middleware/authorization")
const emailVerify = require("../email/emailVerify")
const successLoginUser = require("../email/successLoginUser")
const sendMeEmail = require("../contactMe/sendMeEmail")

const fast2sms = require("fast-two-sms")

router.get("/", (req, res)=>{
    res.send("sdfhsknfsdhfbn")
})


// Email Verification ----------------
router.post("/emailVerify",emailVerify)
// For Registretion ------------------------
router.post("/registretion" ,async(req, res)=>{
    const {name, email, password, mobile, city, dob} = req.body;
    console.log(req.body)
	try{
        if(!name || !email || !password || !mobile || !city || !dob){
            res.status(422).send({error : "Plz fill the all field"})
        }

        const userExist = await Users.findOne({email});
        if(userExist){
            return res.status(422).json({error : "Email is alresdy exist."})
        }

        const data = await new Users({name, email, password, mobile, city, dob})
        const token = await data.generateToken();
        await data.save();
        res.status(201).json({msg : "Registration Successfull."})

    }catch(error){
        res.status(500).json({error : "Failed to Registration"})
    }
})

// Login User And Creationg  a token -----------------------
router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        const data = await Users.findOne({email});
        const checkPassword = await bcrypt.compare(password, data.password)
        
        if(checkPassword){
                const token = await data.generateToken();            
                await res.cookie("bkweb", token,{
                    expires : new Date(Date.now() + 45*24*60*60*1000),
                    httpOnly : true
                })
                // for Send Email 
                await successLoginUser(email)
                res.status(201).json({msg : "login Successfull"})
            }else{
                res.status(422).json({msg : "Invalid Email and Passward."})
            }
    }catch(error){
        console.log(error);
        res.status(422).json({msg : "Faild to Login"})
    }
})


//Logout ---------------------
router.get("/logout",(req, res)=>{
    res.clearCookie("bkweb",path="/")
    res.status(200).json({msg : 'logout successfully'})
})

//  For Contact Form Authorized --------------------
router.get("/contact", authorization, (req, res)=>{
    res.status(200).json(req.rootUser)
})

// Send message data to database ----------------
router.post("/contactMe", sendMeEmail ,async (req, res)=>{
    try{
        if(!(req.sendMail)){
            throw Error("mes not send")
        }
        const {message , name,mobile,email} = req.body;
        const user = await Users.findOne({email});
        if(user){
            await user.addMessage(message);
            res.status(201).json({ status:201 ,message : "Message send successfully .."})
        }
    }
    catch(error){
        res.status(401).json({ status:401 ,message : "Message Not Send .."})
        console.log(error)
    }
})




//  Get User Data on Client Side-------
router.get("/getData", authorization, (req, res)=>{
    res.send(req.rootUser)
}) 






module.exports = router;