const axios = require("axios");
const otpGenerator=require('otp-generator'); 
const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: process.env.API_KEY, //Text local api key
    sender: "ETarkR"
  }
});

const smsClient = {
  sendVerificationMessage: async (phone,otp) => {
    try{

    if (phone) {
      const params = new URLSearchParams();
     
     await params.append("numbers", [parseInt("91" + phone)]);
     await  params.append(
        "message",
        `Dear User,\n\nYour OTP for Sign Up to ETark is ${otp}. Please do not share this OTP.\n\nRegards,\nTeam ETark`

      );
    
     const resp=await tlClient.post("/send", params);
    //  console.log(resp);
    // console.log("texReply",resp.data);
    }
    }catch(err)
    {
        console.log(err);
    }
  }
};

module.exports = smsClient;