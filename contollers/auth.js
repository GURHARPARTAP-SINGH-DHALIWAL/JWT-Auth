const User=require('../models/User');
const jwt=require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
     
     if(err.message==="incorrect email")
     {
       errors.email="email not registered";
     }

     if(err.message==="incorrect password")
     {
       errors.password="incorrect password";
     }

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

module.exports.login_verify=async (req,res) => {

    const {email,password}=req.body;

    try{
        const user=await User.login(email,password);
        console.log(user);
        const token=await createToken(user._id);
        res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge * 1000 });
        

        return res.status(200).json({user:user._id});
    }catch(err)
    {
      console.log(err);
      let errors=handleErrors(err);
      return res.status(400).json({errors});
    }
};

module.exports.logout=(req,res)=>{
  res.cookie('jwt','',{maxAge:1});

  return res.redirect('/login');
};


module.exports.home= async (req,res)=>{

  const token=req.cookies.jwt;
  if(token){
  jwt.verify(token,'hashmy key hash my key',async (err,decodedKey)=>{
      if(err)
      {
          console.log(err);
          res.redirect('back');
      }
      else
      {
          console.log(decodedKey);

          const user=await User.findById(decodedKey.id);

          res.render('home',{
            name:user.name
          });
      }
  });

}
};