//Send Email to user for Successfull Login  

const nodemailer = require("nodemailer")
const admin_email = process.env.ADMIN_EMAIL
const admin_pass = process.env.ADMIN_PASS
const emailSend = async(email)=>{
	const msg = ` <h1>Congratulaton!</h1>
						<p>You have Successfully Login ...</p>
						`
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
            from :admin_email,
            to :email,
            subject : " BK WEB",
            html :msg
        }
        transporter.sendMail(message)
        return "Successfully Login"
    }
    catch(e){
        console.log(e)
       
    }

}
module.exports = emailSend