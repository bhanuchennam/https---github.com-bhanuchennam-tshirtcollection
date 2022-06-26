const braintree = require("braintree");


// const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
//   const [info, setInfo] = useState({
//     loading: false,
//     success: false,
//     clientToken: null,
//     error: "",
//     instance: {}
//   });

// const userId = isAutheticated() && isAutheticated().user._id;
// const token = isAutheticated() && isAutheticated().token;


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});


exports.getToken=(req,res)=>{
    // gateway.clientToken.generate({ }, (err, response) => {
    //   if(err){
    //         res.status(500).send(err);
    //   }
    //   else{
    //       res.send(response);
    //   }
    //   });
}

exports.processPayment=(req,res)=>{
    // gateway.transaction.sale({
    //     amount: "10.00",
    //     paymentMethodNonce: nonceFromTheClient,
    //     deviceData: deviceDataFromTheClient,
    //     options: {
    //       submitForSettlement: true
    //     }
    //   }, (err, result) => {
    //   });
}
