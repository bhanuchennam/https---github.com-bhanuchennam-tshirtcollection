const express = require("express");
const router = express.Router();

const { getProductById,createProduct ,getProduct, photo, deleteProduct ,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById,getUser} = require("../controllers/user");

// all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

// all of routes
//create routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated , isAdmin , createProduct);

//getting the product
//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId",photo);

//delete routes
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated , isAdmin, deleteProduct);

//update route

router.put("/product/:productId/:userId",isSignedIn, isAuthenticated , isAdmin, updateProduct);


//listing routes
router.get("/products", getAllProducts);

//getting all unique categories

router.get("/products/categories",getAllUniqueCategories);

module.exports=router;