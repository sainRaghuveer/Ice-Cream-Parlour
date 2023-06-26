import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Box,
    Input,
    Flex,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Link,
    Heading,
    useColorModeValue,
    Select,
} from '@chakra-ui/react';
import { EditIcon } from "@chakra-ui/icons";
import axios from 'axios';
import UseToast from '../customHook/UseToast';


export default function IceCreamUpdateModal({ id, getData, data }) {
    const [name, setName] = useState("");
    const [flavour, setFlavour] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState();
    const toastMsg = UseToast();

    console.log("UpdateData", data)

    const handleIceCreamUpdate = async () => {
        let obj = {

        };

        axios.patch(``, obj).then((res) => {
            console.log(res);
            toastMsg({
                title: `IceCream data Updated successfully`,
                status: "success"
            });
            getData();
        }).catch((error) => {
            toastMsg({
                title: `${error.message}`,
                status: "error"
            });
        })
    }

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    return (
        <>
            <Box
                ml='4'
                onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                }}
            >
                <EditIcon /> Edit
            </Box>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Update items</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl id="Name">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder='IceCream Name' value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="Flavour">
              <FormLabel>Select Flavour</FormLabel>
              <Select placeholder='Select Flavour' value={flavour} onChange={(e) => setFlavour(e.target.value)}>
                <option value="Chocolate">Chocolate</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Mint">Mint</option>
              </Select>
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
            <FormControl id="stock">
              <FormLabel>Total Stock</FormLabel>
              <Input type="number" placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
            </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            handleIceCreamUpdate()
                            onClose()
                        }}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}