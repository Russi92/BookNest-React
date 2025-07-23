// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Welcome to BookNest Properties
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover your next dream property. Browse our listings, explore detailed information,
          and book with confidence. Whether you're buying, selling, or just looking — you're in the right place!
        </p>
        <Link
          to="/properties"
          className="inline-block bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition duration-300"
        >
          Browse Properties
        </Link>
      </div>

      <div className="md:w-1/2 flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        alt="Real estate"
        className="w-full max-w-md rounded-2xl shadow-lg"
      />
      </div>
    </div>
  );
};

export default Home;
