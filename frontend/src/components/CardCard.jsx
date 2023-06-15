import React from 'react';
import { Tr, Td, Image, Skeleton, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";


const CartCard = ({ data, getData, loading }) => {
  return (
    <>
      <Tr style={{ border: "2px solid teal" }}>
        <Td>{data.id}</Td>
        <Td>{data.name}{" "}{data.lastName}</Td>
        <Td>{data.Flavor}</Td>
        <Td>{data.Description}</Td>
        <Td>{data.Price}</Td>
        <Td>{data.Stock}</Td>
        <Td><Button>{"Order"}</Button></Td>
      </Tr>
    </>
  )
}

export default CartCard