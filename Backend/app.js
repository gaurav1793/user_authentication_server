const dotenv = require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const cors= require('cors');
const connectDB = require('./db/db');
const router = require('./routes/user.routes');
const cookieparser = require('cookie-parser');


app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use('/users' ,router);


app.get('/',(req,res)=>{
    console.log('ih');
    res.send("hlo bhai");
})


module.exports=app;