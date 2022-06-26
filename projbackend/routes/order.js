const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById,getUser ,pushOrderInPurchaseList} = require("../controllers/user");

const {updateStock} = require("../controllers/product");

const {createOrder,getOrderById,getAllOrders,getOrderStatus,updateStatus} =require("../controllers/order");
const { route } = require("./product");


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);


//actual routes
//create routes

router.get("/order/create/:userId", isSignedIn , isAuthenticated, pushOrderInPurchaseList,updateStock ,createOrder);

//read routes

router.get("/order/all/:userId",isSignedIn , isAuthenticated,isAdmin,getAllOrders)

//status of order

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);

router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);
  

module.exports=router;