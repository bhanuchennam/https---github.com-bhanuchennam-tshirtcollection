import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart,removeItemFromCart } from "./helper/cartHelper";
import { signout ,isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Cart = () => {
  
  const [products, setProducts] = useState([]);
  const[reload,setReload]=useState(false);

  const { user, token } = isAutheticated();

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products && products?.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ) ) }
      </div>
    )
  }
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">

      <div className="col-6">
      <Link className="btn btn-outline-warning" to={`/`}>
        <span className="">Home Page</span>
      </Link>
          { products && products.length > 0 ? (loadAllProducts(products)) : (<h4>No products Click on Home Page to add products</h4>)}
        </div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;