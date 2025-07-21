
// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '../context/SearchContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { setSearchTerm } = useSearch();

  return (
    <nav className="bg-violet-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

             {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to='/' className="text-white hover:text-amber-600 transition">Home</Link>
            <Link to='/users' className="text-white hover:text-amber-600 transition">Users</Link>
            <Link to='/properties' className="block text-white hover:text-amber-600">Properties</Link>
            <Link to='/bookings' className="text-white hover:text-amber-600 transition">Bookings</Link>
            <Link to='/contact us' className="text-white hover:text-amber-600 transition">Contact</Link>
          </div>

         

          {/* Logo */}
          <div className='flex'>

          <div className='md:flex hidden space-x-6'>
          <input
          type="text"
          placeholder="🔍 Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 h-8 p-3 m-5 bg-violet-700  rounded-full placeholder:text-white focus:outline-none focus:ring text-white"
          />
          </div>

          <Link to='/' className="flex-shrink-0 flex items-center text-xl font-bold text-white">
            BookNest
          </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none text-2xl transition"
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          <div>

          <Link to='/' className="text-black block hover:text-amber-600 transition">Home</Link>
          <Link to='/users' className="text-black hover:text-amber-600 transition">Users</Link>
          <Link to='/properties' className="block text-black hover:text-amber-600">Properties</Link>
          <Link to='/bookings' className="text-black block hover:text-amber-600 transition">Bookings</Link>
          <Link to='/contact us' className="text-black block hover:text-amber-600 transition">Contact</Link>
          </div>

          <div className='text-center'>
            <input type="text" placeholder='🔍 Search...' 
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-80 h-8 p-3
            bg-violet-100 focus:outline-none focus:ring text-black rounded placeholder:text-black'/>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
