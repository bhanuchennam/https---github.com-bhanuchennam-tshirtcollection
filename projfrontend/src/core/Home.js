import React, {useEffect, useState} from 'react';
import "../styles.css";
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {

  const [products,setProducts]=useState([0]);
  const [error, setError] = useState(false);

  const loadAllPhotos=()=>{

    getProducts().then (data=> {
      if(data && data?.error){
        console.log("error loading the products");
      }
      else{
        setProducts(data);
      }

    }); 
  };

  useEffect(()=>{
    loadAllPhotos();
  },[]);
   
    return (
      <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white"> All of t shirts</h1>
        <div className="row">
          {products && products?.map((product,index)=>{
            return(
              <div key={index} className="col-3 mb-4">
                <Card product={product} />
              </div>
            )
          })}
        </div>
      </div>
    </Base>
      );
  }