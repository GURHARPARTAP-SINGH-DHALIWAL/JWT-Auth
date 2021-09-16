const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter name']
    },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[5,'password should be atleast 5 characters long']
    }
});


//  Mongoose Hooks fire before or after a mongoose event
// for hashing password

// Don't use arrow function as this will point to object 
// evry mongoose hook orn moddlewate shud have next otherwise it will be atuck here forever


userSchema.pre('save',async function(next){

    const salt=await bcrypt.genSalt();

    this.password=await bcrypt.hash(this.password,salt);
    next();

});

// Static functions are attcahed to moedl and available anywhere
// This points to user model

userSchema.statics.login=async function(email,password){

    const user=await this.findOne({email});

    if(user)
    {
        const auth=await bcrypt.compare(password,user.password);
        if(auth)
        {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");

};

const User=mongoose.model('user',userSchema);
module.exports=User;