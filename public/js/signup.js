
window.addEventListener('load',function(){
const otpButton=this.document.getElementById('otp-button');
const form=document.getElementById('signup-form');
const emailError=document.getElementById("errE");
const passwordError=document.getElementById("errP");
const phoneError=document.getElementById("errPh");
const otpError=document.getElementById("errotp");
var otpServer="";
otpButton.addEventListener('click',async (e)=>{
     

    e.preventDefault();
    console.log("Clicked");
    const phone=form.phone.value;

    if(!phone)
    {
        phoneError.textContent="Please enter a valid phone number";
        return ;
    }

    if(otpServer)
    {
        otpError.textContent="OTP Already Sent";
        return ;
    }
    try{
    const res=await fetch('/generateotp',{

        method:'POST',
        body:JSON.stringify({phone}),
        headers:{'Content-Type':'application/json'}
    });

    const data=await res.json();
    console.log(data);

    if(data.otp)
    {
        otpServer=data.otp;
        otpError.textContent=`OTP sent to ${phone}`;
    }
    else
    {
        otpError.textContent=`Failed to Send OTP`;
    }

    }
    catch(err)
    {
        console.log(err);
    }





});




console.log("hello");
 console.log("hello");
console.log(form);
  form.addEventListener("submit",async (e)=>{
      e.preventDefault();
      
      emailError.textContent='';
      passwordError.textContent='';
      const name=form.name.value;
      const email=form.email.value;
      const password=form.password.value;
      const phone=form.phone.value;
      if(form.otp.value!=otpServer)
      {   
          
          
          otpError.textContent="Invalid OTP / Reload and Press Send OTP to get OTP again";
          return;
      }
      try{
      const res=await fetch('/signup',{
          method:'POST',
          body:JSON.stringify({name,email,password,phone}),
          headers:{'Content-Type':'application/json'}

      });
      const data=await res.json();
      if(data.errors)
      {
          emailError.textContent=data.errors.email;
          passwordError.textContent=data.errors.password;
      }

      if(data.user)
      {
          location.assign('/');
      }

      
    }
    catch(err)
    {
        console.log(err);

    }

    //   console.log(name," ",email," ",password);
  });


});