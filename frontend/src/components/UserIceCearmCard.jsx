import React from 'react';
import { Tr, Td, Image, Skeleton, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import UseToast from '../customHook/UseToast';



const UserIceCreamCard = ({ data, getData, loading }) => {
  const toastMsg = UseToast();

  const handleCart=()=>{
    let obj={
      name:data.name,
      Flavor:data.Flavor,
      Description:data.Description,
      Price:data.Price,
      Quantity:1
    }
    
    axios.post(`http://localhost:3000/cart`,obj).then((res)=>{
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
    })
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
        <Td><Button onClick={handleCart}>{"Add to Cart"}</Button></Td>
      </Tr>
    </>
  )
}

export default UserIceCreamCard