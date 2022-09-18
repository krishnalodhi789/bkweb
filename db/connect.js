const mongoose = require("mongoose");

const db = process.env.DB_REMOTE
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connection Successful"))
.catch((e)=>console.log("NO connection"))

