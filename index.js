const express=require('express');
const PORT=process.env.PORT||8000;
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const expressejslayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');

const app=express();


dotenv.config({path:"./config/config.env"});
app.use(express.urlencoded());
app.use(express.json());
// for string cookie in res and res
app.use(cookieParser());

// Connect to DB
connectDB();


app.use(expressejslayouts);
//From every ejs page it will take the link tag and put it in the head
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('public'));
app.set('view engine','ejs');



app.use(require('./routes/auth'));


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