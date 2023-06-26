import React, { useState } from 'react';
import { Tr, Td, Image, Skeleton, Button, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import UseToast from '../customHook/UseToast';



const UserIceCreamCard = ({ data, getData, loading }) => {
  const [iceCream, setIceCream] = useState(1);
  const [stocks, setStock] = useState(data.stock);
  const toastMsg = UseToast();

  const handleCart=()=>{
    let remainingStocks = (data.Stock-iceCream);

    let obj={
      name:data.name,
      Flavor:data.Flavor,
      Description:data.Description,
      Price:data.Price,
      Quantity:iceCream
    }
    
    axios.post(`https://icecrem-parlour-assignment.onrender.com/cart`,obj).then((res)=>{
      console.log(res);
      toastMsg({
        title: `Added into cart`,
        status: "success"
      });
    }).catch((error)=>{
      console.log(error);
      toastMsg({
        title: `${error.message}`,
        status: "error"
      });
    });

    axios.patch(`http://localhost:3000/iceCream/${data.id}`, {Stock:remainingStocks}).then((res)=>{
      console.log(res);
      getData();
    }).catch((error)=>{
      console.log(error);
    });
  }
  return (
    <>
      <Tr style={{ border: "2px solid teal" }}>
        <Td>{data.id}</Td>
        <Td>{data.name}</Td>
        <Td>{data.Flavor}</Td>
        <Td>{data.Description}</Td>
        <Td>{data.Price}</Td>
        <Td>{data.Stock}</Td>
        <Td><Input value={iceCream} onChange={(e)=>setIceCream(e.target.value)} width={"100px"} border={"1px solid gray"} type="number" placeHolder="IceCream"></Input><Button onClick={handleCart} isDisabled={data.Stock<=0}> {"Add to Cart"}</Button></Td>
      </Tr>
    </>
  )
}

export default UserIceCreamCard