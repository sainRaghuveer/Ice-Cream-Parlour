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
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [gender, setGender] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState();
    const toastMsg = UseToast();

    // console.log("UpdateData", data)

    const handleIceCreamUpdate = async () => {
        let obj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            gender: gender,
            status: status,
            location: location,
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
                        <FormControl id="First Name">
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Select your Gender</FormLabel>
                            <Select placeholder='Select your gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Select>
                        </FormControl>
                        <FormControl id="First Name">
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </FormControl>
                        <FormControl id="mobile">
                            <FormLabel>Mobile</FormLabel>
                            <Input type="text" placeholder='Mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </FormControl>
                        <FormControl id="status">
                            <FormLabel>Select your Status</FormLabel>
                            <Select placeholder='Status...' value={gender} onChange={(e) => setStatus(e.target.value)}>
                                <option value="active">Active</option>
                                <option value="inactive">InActive</option>
                            </Select>
                        </FormControl>
                        <FormControl id="location">
                            <FormLabel>Enter your Location</FormLabel>
                            <Input type='text' placeholder='location' value={location} onChange={(e) => setLocation(e.target.value)} />
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