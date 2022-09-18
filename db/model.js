const mongoose =require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:Number,
		required:true,
		min : 10
	},
	password:{
		type:String,
		required:true
	},
	date:{
		type:String,
		default:new Date().toLocaleDateString(),
		required :true
	},
	time:{
		type:String,
		default:new Date().toLocaleTimeString(),
		required :true
	},
	city:{
		type:String,
		required:true
	},
	dob:{
		type:String,
		required:true,
	},
	messages:[
		{
			message:{
				type:String,
				required :true
			}
		}
	],
	tokens:[
		{
			token:{
				type:String,
				required :true
			}
		}
	]
})

//Generating Token For Authorizartion -----------------------
usersSchema.methods.generateToken = async function(){
	const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
	this.tokens = await this.tokens.concat({token}) 
	return token;
}


// Secure the Password Useing === Bcryptjs ===== ----------------
usersSchema.pre("save",async function(){
	if(this.isModified("password")){
		this.password = await bcrypt.hash(this.password, 10);
	}
})

// Add Message in User Document ----------
usersSchema.methods.addMessage = async function(message){
	try{
		this.messages = await this.messages.concat({message});
		await this.save();
	}catch(err){
		console.log(err)
	}
}



const Users = new mongoose.model("User",usersSchema)
module.exports = Users;