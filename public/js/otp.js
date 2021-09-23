
window.addEventListener('load',()=>{
    const otpForm=document.getElementById('otp-form');
const otpError=this.document.getElementById('otp-error');
const otpSubmit=document.getElementById('otp-login');
    otpSubmit.addEventListener('click',async (e)=>{
        console.log("jjff");
      e.preventDefault();
      const otp=otpForm.otp.value;
      const res=  await fetch('/verifyotp',{
       
          method:'POST',
          body:JSON.stringify({otp}),
          headers:{'Content-Type':'application/json'}


      });

      const data=await res.json();

        if(data.otp==otp)
        {
          location.assign('/');
        }
        else
        {   
            console.log("Heyy");
            otpError.textContent="Invalid OTP";
        }
  });

});