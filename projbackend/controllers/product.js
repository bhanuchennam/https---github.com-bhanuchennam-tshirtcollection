const Product=require("../models/product");
const formidable=require("formidable");   // for handing the form data (files ) // research more
const _=require("lodash");   //Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
const fs=require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");

exports.getProductById=(req,res,next,id) => {

  Product.findById(id)
  .exec((err,product) => {
      if(err){
          return res.status(400).json({
              err:"Product not found"
          });
      }
      req.product=product;
      next();
  });

};


exports.createProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }

    // destructuring  the filed
    const { name, description, price, category, stock}=fields;

    if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      //will store in the database
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

     //save to the DB
     product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });

};

exports.getProduct=(req,res)=>{

  req.product.photo = undefined  
  return res.json(req.product);
}


//middle ware
exports.photo=(req,res,next)=>{
  if(req.product.photo.data){
      res.set("Content-Type",req.product.photo.contentType)
     return res.send(req.product.photo.data)
  }
 next();
};

//delete controller 
exports.deleteProduct=(req,res,next)=> {
  let product = req.product;
  product.remove((err,deletedProduct)=>{
      if(err){
          return res.status(400).json({
              err:"Failed to delete the product"
          });
      }

      res.json({
          message:"Deletion was sucessfull",
          deletedProduct
      });
  });

};

//update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code product fileds will be replaced
      let product = req.product;
      product = _.extend(product, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updation of product failed"
          });
        }
        res.json(product);
      });
    });
  };


  //getting all the products
  exports.getAllProducts=(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy= req.query.sortBy ? req.query.sortBy: "_id" ;

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(8)
    .exec((err,products)=>{
        if(err){
            return res.json({
                err:"Product list cant be fetched"
            });
        }
        return res.json(products);
    });

  };

//bulk write // study more
  exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
      return {
        updateOne: {
          filter: { _id: prod._id },
          update: { $inc: { stock: -prod.count, sold: +prod.count } }
        }
      };
    });
  
    Product.bulkWrite(myOperations, {}, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Bulk operation failed"
        });
      }
      next();
    });
  };


//getting the unique categories'

  exports.getAllUniqueCategories = (req, res ,next) => {
   Product.distinct("category",{},(err,category)=>{
    if(err){

      return res.status(400).json({
        err: "unable to fetch the unique category"
      });
    }
     res.json(category);
   
   });
  };