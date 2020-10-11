// PAYSTACK TEST

var axios = require('axios');
//var data = JSON.stringify({"email":"some@body.nice","amount":"10000","card":{"cvv":"081","number":"507850785078507812","expiry_month":"01","expiry_year":"99"},"pin":""});
//var data = JSON.stringify({"pin": "1111", "reference":"jrxrldffbhv77a1"})
//var data = JSON.stringify({ "authorization_code": "AUTH_4lmt1h48qq", "email": "some@body.nice", "amount": "10000" })
var config = {
  method: 'get',
  //url: 'https://api.paystack.co/charge',
  //url: 'https://api.paystack.co/charge/submit_pin',
  //url: 'https://api.paystack.co/transaction/charge_authorization',
  url: "https://api.paystack.co/transaction/verify/96wqbbqwl6zo3pk",

  headers: { 
    'Authorization': 'Bearer sk_test_00f45925c1a6eaf7724a8c5b04de1540f1cc2c66', 
    'Content-Type': 'application/json'
  },
  //data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//
{/**
Store User Card Details
user: {
    _id: "Fangibh454v",
    email: "ola@gmail.com",
    address: "Lagos",
    "card": {
        "customer_email": "ola@gmail.com",
        "authorization_code":"AUTH_4lmt1h48qq",
         "bin":"507850",
         "last4":"7812",
         "exp_month":"01",
         "exp_year":"2099",
         "channel":"card",
         "card_type":"verve ",
         "bank":"TEST BANK",
         "country_code":"NG",
         "brand":"verve",
         "reusable":true,
         "signature":"SIG_K5KFYsq0pvWNs2Cafgpb",
         "account_name":null
    }
}
*/}