import React, { useCallback } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseToast from '../customHook/UseToast';
import IceCreamUpdateModal from './IceCreamUpdateMOdal';

const ActionMenu = ({ id, getData, data }) => {
    const navigate = useNavigate();
    const toastMsg = UseToast();

    const handleDelete = useCallback(() => {
        axios.delete(`http://localhost:3000/iceCream/${id}`)
            .then((res) => {
                toastMsg({
                    title: `data deleted successfully`,
                    status: "success"
                });
                getData();
            })
            .catch((error) => {
                toastMsg({
                    title: `${error.message}`,
                    status: "error"
                });
            });
    }, []);

    return (
        <>
            <Menu>
                <MenuButton as={Button}>
                    {<BsThreeDotsVertical />}
                </MenuButton>
                <MenuList>
                    <MenuItem >{<IceCreamUpdateModal id={id} getData={getData} data={data}/>}</MenuItem>
                    <MenuItem onClick={handleDelete}>{<DeleteIcon />} {" "}Delete</MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default ActionMenu