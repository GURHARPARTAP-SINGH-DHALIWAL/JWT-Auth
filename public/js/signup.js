
window.addEventListener('load',function(){

const form=document.getElementById('signup-form');
console.log("hello");
 console.log("hello");
console.log(form);
  form.addEventListener("submit",async (e)=>{
      e.preventDefault();
      const name=form.name.value;
      const email=form.email.value;
      const password=form.password.value;
      try{
      const res=await fetch('/signup',{
          method:'POST',
          body:JSON.stringify({name,email,password}),
          headers:{'Content-Type':'application/json'}

      });
    }
    catch(err)
    {
        console.log(err);
            
    }

      console.log(name," ",email," ",password);
  });


});