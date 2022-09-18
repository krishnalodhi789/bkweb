const nodemailer = require("nodemailer")
const admin_email = process.env.ADMIN_EMAIL
const admin_pass = process.env.ADMIN_PASS

const emailVerify = async(req, res)=>{
    const {email} = req.body
    const otp =( Math.floor(100000+Math.random()*900000))
    const msg = ` Your Verification OTP is : ${otp},
    \n It is Valid for  10 Minutes.`;
    try{
        const transporter =  nodemailer.createTransport({
            port : 465,
            host : "smtp.gmail.com",
            servise : "gmail",
            secureTLS : true,
            auth : {
                 user : admin_email,
                pass : admin_pass
            }
        })
        const message = {
            from :"bklodhi901@gmail.com",
            to :email,
            subject : " BK lodhi web",
            text :msg
        }
        transporter.sendMail(message,  (err)=>{
            if(err){
                console.log(err)
                res.status(400).json({code : 400, msg :"Invalid Email"})
            }
            else{

                res.status(200).json({ otp ,msg :"Send OTP to user Email"})
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({code : 400, msg :"Invalid Email"})
    }
}


module.exports = emailVerify