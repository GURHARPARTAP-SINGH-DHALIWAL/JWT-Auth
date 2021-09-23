
window.addEventListener('load',function(){

    const form=document.getElementById('login-form');
    const emailError=document.getElementById("errE");
    const passwordError=document.getElementById("errP");


    var loginOtp="";
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
          try{
          const res=await fetch('/login',{
              method:'POST',
              body:JSON.stringify({email,password}),
              headers:{'Content-Type':'application/json'}
    
          });
          const data=await res.json();
          console.log(data);
          if(data.errors)
          {
              emailError.textContent=data.errors.email;
              passwordError.textContent=data.errors.password;
          }
          if(data.otp)
          {
              loginOtp=data.otp;
          }

          if(data.user)
          {
              location.assign('/otpscreen');
          }
        }
        catch(err)
        {
             console.log(err);
    
        }
    
        
      });

    
    
    });


  