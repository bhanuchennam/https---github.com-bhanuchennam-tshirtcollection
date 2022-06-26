import { API} from "../../backend";

export const creatOrder=(userId, token, OrderData)=>{

    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body :JSON.stringify({order: OrderData})
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>console.log(err));

};