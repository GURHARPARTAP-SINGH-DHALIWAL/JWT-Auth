const mongoose=require('mongoose');


const connectDB=async ()=>{
    try{
       const conn= await mongoose.connect("mongodb+srv://gurharpartap:gurharpartap@cluster0.u6chi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        //    options to remove some of the warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);

    }   

};

module.exports=connectDB;