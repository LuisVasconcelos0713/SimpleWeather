import { useState } from 'react'
import './App.css'
import b from "./assets/logoweather.png"
import {Outlet} from "react-router-dom";

function App() {

  return (
    <>
        <Outlet></Outlet>
    </>
  )
}

export default App
