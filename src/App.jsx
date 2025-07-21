import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Properties from './components/Properties'
import Users from './components/Users';
import Contact from './components/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Navbar />
        <Routes>

          <Route path='/' element={<Home />}/> 

          <Route path='/properties' element={<Properties />}/> 

          <Route path='/users' element={<Users />}/>

          <Route path='/contact us' element={<Contact />}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
