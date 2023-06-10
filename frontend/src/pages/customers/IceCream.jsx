import React from 'react';
import {useSelector} from "react-redux"

const IceCream = () => {
  const data = useSelector((store)=>{return store});

  console.log(data);
  return (
    <div>IceCream</div>
  )
}

export default IceCream