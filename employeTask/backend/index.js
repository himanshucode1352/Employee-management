const express=require("express");
const mongoose= require("mongoose");
const app=express();
const Dotenv = require("dotenv")
const employeeRoutes= require('./routes/emplyeeRoute')
var cors=require("cors");
app.use(cors());
app.use(express.json());
app.use('/employee',employeeRoutes);
Dotenv.config()
const url2 = process.env.db
// "mongodb+srv://himtri6657:ambala123@cluster0.7kqxo.mongodb.net/ecommerce"

mongoose.connect(url2).then(()=>{
    console.log("Database Connected Succssfully")
}).catch((err)=>{
    console.log(err)
});
const port = process.env.port||8001
app.listen(port);