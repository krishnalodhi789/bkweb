const nodemailer = require("nodemailer")

const admin_email = process.env.ADMIN_EMAIL
const admin_pass = process.env.ADMIN_PASS

const sendMeEmail = async(req, res, next)=>{
    const {message,email} = req.body; 
    const userEmail = email
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
        const msg = {
            from :userEmail,
            to :admin_email,
            subject : "User Message ...",
            text :message
        }
        await transporter.sendMail(msg)
        req.sendMail = true
    }
    catch(e){
        req.sendMail = false
        console.log(e)
    }

    next()

}

module.exports = sendMeEmail;