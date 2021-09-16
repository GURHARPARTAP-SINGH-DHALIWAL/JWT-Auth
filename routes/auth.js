const express=require('express');
const router=express.Router();
const authController=require('../contollers/auth');
const {isAuth,isGuest}=require('../middleware/authMiddleware');



router.get('/',(req,res)=>{
    res.redirect('home');
});

router.get('/home',isAuth,authController.home);
router.get('/signup',isGuest,authController.sign_up_page);
router.post('/signup',authController.sign_up_add);
router.get('/login',isGuest,authController.login_up_page);
router.post('/login',authController.login_verify);
router.get('/logout',isAuth,authController.logout);




module.exports=router;