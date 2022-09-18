const jwt = require("jsonwebtoken");
const User = require("../db/model");

const auth = async(req, res, next) =>{
	try{
		const jwtToken = req.cookies.bkweb;
		const verifyToken = await jwt.verify(jwtToken, process.env.SECRET_KEY);

		const user = await User.findOne({_id:verifyToken._id})
		if(!user){throw new Error("User Not Found..")}
		req.token = jwtToken
		req.rootUser = user;
		req.userID = user._id
		next()
	}
	catch(err){
			res.status(401).send(" Unauthorized token not Provided..")
			console.log(err)
	}
}
module.exports = auth;