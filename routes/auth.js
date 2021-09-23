const express=require('express');
const router=express.Router();
const authController=require('../contollers/auth');
const {isAuth,isGuest}=require('../middleware/authMiddleware');
const textlocal=require('../util/textlocal');
const otpGenerator=require('otp-generator');




router.get('/',(req,res)=>{
    res.redirect('home');
});

router.get('/home',isAuth,authController.home);
router.get('/signup',isGuest,authController.sign_up_page);
router.post('/signup',authController.sign_up_add);
router.get('/login',isGuest,authController.login_up_page);
router.post('/login',authController.login_verify);
router.get('/logout',isAuth,authController.logout);
router.post('/verifyotp',authController.verifyOtp);
router.post('/generateotp',async (req,res)=>{
    try{
     const otp=await otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
     
     await  textlocal.sendVerificationMessage(req.body.phone,otp);
    return res.status(200).json({otp});
    }
    catch(err)
    {   
        console.log(err);
        res.status(500).json({
          message:"Error"  
        });
    }

});


router.get('/otpscreen',(req,res)=>{
    res.render('otpScreen');
});

module.exports=router;