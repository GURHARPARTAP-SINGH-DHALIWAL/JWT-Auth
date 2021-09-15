const User=require('../models/User');
const jwt=require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},'hashmy key hash my key',{
        expiresIn:maxAge
    });
}
module.exports.sign_up_page=(req,res)=>{
    return res.render('signup');
};
module.exports.login_up_page=(req,res)=>{
    return res.render('login');
};

module.exports.sign_up_add=async (req,res)=>{
    const {name, email, password } = req.body;

    try {
      const user = await User.create({ name,email, password });
      const token=createToken(user._id);
      res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({user:user._id});
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
};

module.exports.login_verify=(req,res)=>{
    return res.render('signup');
};