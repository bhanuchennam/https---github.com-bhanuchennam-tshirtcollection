const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {

    Category.findById(id).exec((err,cate) =>{
     
        if(err){
            return res.status(400).json({
                err : "category not found in database"
            })
        }

        req.category=cate;
        next();
     
    })    
};

// creating the category

exports.createCategory=(req,res,next)=> {

   const category = new Category(req.body);
   category.save((err,category)=>{
       if(err){
           return res.status(400).json({
               err:"category can't be created"
           });
       }
       res.json({category});
       next();
   });

};

//geting the single category

exports.getCategory=(req,res) =>{

  return res.json(req.category);

};


//getting all the categories

exports.getAllCategory=(req,res) => {
    Category.find().exec((err,categories)=>{

       if(err){
           return res.status(400).json({
               err:"cant fetch the category"
           });
       }
       res.json(categories);

    })
};

//updating the categories

exports.updateCategory=(req,res)=> {

    const category= req.category;
    category.name =req.body.name;

    category.save((err,updatedcategory)=>{
        if(err){
            return res.status(400).json({
                err:"category can't be updated"
            });
        }
        res.json(updatedcategory)
    })

}

//deleting the category

exports.removeCategory=(req,res)=>{

    const category= req.category;

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"category can't be deleted"
            });
        }

        res.json({
            message:"Sucessfully deleted"
        });
    });
};