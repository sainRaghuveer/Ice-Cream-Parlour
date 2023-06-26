import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react';
import axios from "axios";
import UseToast from '../../customHook/UseToast';

const AddIcecream = () => {
  const [name, setName] = useState("");
  const [flavour, setFlavour] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const toastMsg = UseToast();

  const handleIceCream = async () => {
    let obj = {
      name:name,
      Flavour:flavour,
      Description:description,
      Stock:stock,
      Price:price
    };

    setLoading(true);
    setTimeout(() => {
      axios.post(`http://localhost:3000/iceCream`, obj).then((res) => {
        console.log(res);
        setLoading(false);
        toastMsg({
          title: "Data Added successfully",
          status: "success"
        });
      }).catch((error) => {
        setLoading(false);
        toastMsg({
          title: `${error}`,
          status: "error"
        })
      })
    }, 2000);
  }


  return (
    <div>
      <div className='inputContainer'>
        <Box
          w={{ base: "100%", md: "48%" }}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          id='child1'
        >
          <Stack spacing={4}>
            <FormControl id="Name">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder='IceCream Name' value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Select your Gender</FormLabel>
              <Select placeholder='Select your gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </Stack>
        </Box>
      </div>
      <div className='btn'>
        {loading ? <Button
          isLoading
          loadingText='Submitting'
          colorScheme='blue'
          variant='outline'
        >
          Submit
        </Button> : <Button onClick={handleIceCream}>Submit</Button>}

      </div>
    </div>
  )
}

export default AddIcecream