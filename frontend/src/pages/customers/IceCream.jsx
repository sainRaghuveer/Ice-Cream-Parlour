import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import "../../styles/IceCream.css";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import UseToast from '../../customHook/UseToast';
import {Datacard} from "../../components/Datacard"
import { Spinner } from '@chakra-ui/react'

const Home = () => {
  const [data, setData] = useState([]);
  const [csvLoading, setCsvLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const toastMsg = UseToast();


  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/iceCream`);
      const res = await response.json();
      console.log(res)
      if (response.ok) {
        setData([]);
        setData(res);
        setLoading(false);
      } else {
        console.log('Failed to fetch users data');
      }
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
      toastMsg({
        title: `${error.message}`,
        status: "error"
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  const handleQuery = () => {
    getData();
  }

  return (
    <div className='parentContainer'>
      <div className='searchContainer'>
        <div>
          <Input type="search" placeholder='Search here...' value={query} onChange={(e) => setQuery(e.target.value)}></Input>
          <Button id='sbtn' onClick={handleQuery}>Search</Button>
        </div>
        <div>
          <Button onClick={() => navigate("/register")}><AiOutlinePlus /> Add User</Button>
          {csvLoading ? <Button
            isLoading
            loadingText='Wait...'
            colorScheme='blue'
            variant='outline'
          >
            Submit
          </Button> : <Button >{"Export to Csv"}</Button>}
        </div>
      </div>
      <div className='tableContainer'>
        <TableContainer>
          <Table variant='striped'>
            <TableCaption>All Users will be here</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Flavour</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Add to Cart</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ?<div id='loader'> <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' /> <h1>Please Wait while data loading...</h1></div> : data.length > 0 && data.map((user) => (
                  <Datacard key={user.id} data={user} getData={getData} />
                ))}

            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Home