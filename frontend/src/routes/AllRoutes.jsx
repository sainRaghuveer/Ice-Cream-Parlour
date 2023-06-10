import React from 'react';
import {Routes, Route} from "react-router-dom"
import IceCream from '../pages/customers/IceCream';
import Cart from '../pages/customers/Cart';
import AddIcecream from '../pages/Admin/AddIcecream';
import Inventory from '../pages/Admin/Inventory';
import Login from '../pages/Admin/Login';

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            {/*---------------- Customer routes --------------- */}
            <Route path='/' element={<IceCream/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>

            {/*---------------- Admin routes --------------- */}
            <Route path='/addicecream' element={<AddIcecream/>}></Route>
            <Route path='/inventory' element={<Inventory/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes