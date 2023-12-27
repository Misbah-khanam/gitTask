import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./screens/Home";


const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
    </Routes>
  )
}

export default AllRoutes