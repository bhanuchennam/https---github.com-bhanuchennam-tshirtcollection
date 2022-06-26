import React, { useState,useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageHelper from "../admin/helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAutheticated } from "../auth/helper";

export const Card = ({ product, addtoCart=true,removeFromCart=false ,setReload= f =>f ,reload=undefined}) => {

    const [redirect,setRedirect]=useState(false)
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name :"A photo from pixels"
    const cardDesc = product ? product.description :"xxxxxxxx"
    const cardPrice = product ? product.price :"default"

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect =(redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showaddtoCart=(addtoCart)=>{
        return(
            addtoCart &&
            <button
              onClick={addToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2">
              Add to Cart
              </button>
            )
    }


    const isUserLogined=()=>{
      return(
          <div>

          </div>
      )
    }

 const showremovefromcart=removeFromCart=>{
        return(
           removeFromCart && 
            <button
              onClick={() => {  
                removeItemFromCart(product._id);
                 setReload(!reload);
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
               Remove from cart
            </button>
      )
    };


  return (
    <div className="card text-white bg-white border border-info ">

      <div className="card-header text-black lead">{cardTitle}</div>
      <div className="card-body">
          {getARedirect(redirect)}

        <ImageHelper product={product} />

        <p className="lead bg-success font-weight-normal text-wrap">
         {cardDesc}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">          
           $ {cardPrice}
        </p>
        <div className="row">
          <div className="col-12"> {showremovefromcart(removeFromCart)} </div>
          <div className="col-12">  {showaddtoCart(addtoCart)} </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
