import React ,{useEffect, useState} from 'react';
import Base from '../core/Base';
import { isAutheticated } from "../auth/helper";
import {getCategories } from "./helper/adminapicall";




export const ManageCategory = () => {

  const { user, token } = isAutheticated();

  const [categories, setCategories] = useState([]);

  const preload =()=>{
    getCategories().then(data=>{
      if(data.error){
         console.log("error while loading categories");
      }
      else{
        setCategories(data);
      }
    })
  };

  useEffect(()=>{
    preload();
  },[]);

    return(
       <Base
       title="Manage a category here"
       description="Add or create categories"
       className="container bg-info p-4" >

      <div>  
       <h1 className="text-white"> Manage categories here</h1>

       <li className="list-group-item" >
       <span className="badge bg-success"> Categories :</span> 
       {categories &&
            categories.map((cate, index) => (
              <li key={index} value={cate._id}>
                {cate.name}
              </li>
            ))}

      </li>   

       </div>
       </Base>
    );

};

export default ManageCategory;