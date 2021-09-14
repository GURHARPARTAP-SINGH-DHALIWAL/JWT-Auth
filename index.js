const express=require('express');
const PORT=process.env.PORT||8000;
const dotenv=require('dotenv');
const connectDB=require('./config/db');

const app=express();


dotenv.config({path:"./config/config.env"});


// Connect to DB
connectDB();





app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("Error in Starting the server");
    }
    else
    {
        console.log("Server Successfully Running");
    }

});