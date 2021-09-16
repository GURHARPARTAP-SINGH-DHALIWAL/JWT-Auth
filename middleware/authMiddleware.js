const jwt=require('jsonwebtoken');

const isAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
    jwt.verify(token,'hashmy key hash my key',(err,decodedKey)=>{
        if(err)
        {
            console.log(err);
            res.redirect('/login');
        }
        else
        {
            console.log(decodedKey);
        }
    });



    }
    else
    {
        res.redirect('/login');
    }
    next();


};

const isGuest=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
    jwt.verify(token,'hashmy key hash my key',(err,decodedKey)=>{
        if(err)
        {
            console.log(err);
            next();
        }
        else
        {
            console.log(decodedKey);
            res.redirect('/home');
        }
    });



    }
    else
    {
        next();
    }
    next();
};


module.exports={isAuth,isGuest};