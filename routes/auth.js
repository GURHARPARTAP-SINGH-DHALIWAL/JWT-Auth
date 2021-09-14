const express=require('express');
const router=express.Router();
const authController=require('../contollers/auth');



router.get('/signup',authController.sign_up_page);
router.post('/signup',authController.sign_up_add);
router.get('/login',authController.login_up_page);
router.post('/login',authController.login_verify);



module.exports=router;