import React from 'react';
import { Tr, Td, Image, Skeleton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActionMenu from './ActionMenu';

const DataCard = ({ data, getData, loading }) => {
  return (
    <>
      <Tr style={{ border: "2px solid teal" }}>
        <Td>{data.id}</Td>
        <Td>{data.name}{" "}{data.lastName}</Td>
        <Td>{data.Flavour}</Td>
        <Td>{data.Description}</Td>
        <Td>{data.Price}</Td>
        <Td>{data.Stock}</Td>
        <Td>{<ActionMenu id={data._id} getData={getData} data={data} />}</Td>
      </Tr>
    </>
  )
}

export default DataCard