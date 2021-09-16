
window.addEventListener('load',function(){

const form=document.getElementById('signup-form');
const emailError=document.getElementById("errE");
const passwordError=document.getElementById("errP");
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
      const res=await fetch('/signup',{
          method:'POST',
          body:JSON.stringify({name,email,password}),
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

      console.log(name," ",email," ",password);
  });


});