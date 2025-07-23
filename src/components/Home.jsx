

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: 2,
    title: "Cozy Cabin",
    image: "https://www.adobe.com/eg_ar/creativecloud/photography/discover/media_1159b19a8225b2413136806b0be15e4c921e3d122.png?width=750&format=png&optimize=medium",
  },
  {
    id: 3,
    title: "Luxury Villa",
    image: "https://webneel.com/daily/sites/default/files/images/daily/08-2014/2-real-estate-photography.jpg",
  },
  {
    id: 4,
    title: "Beach House",
    image: "https://cinema2y.com/wp-content/uploads/2021/05/%D8%AA%D8%B5%D9%88%D9%8A%D8%B1-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA-7.jpg",
  },
];


const HomePage = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
          Welcome to <span className="text-blue-600">BookNest</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Discover and book beautiful properties around the world. Perfect for vacations, business trips, or weekend getaways.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/properties">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition duration-300">
              Browse Properties
            </button>
          </Link>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl text-lg transition duration-300">
            Become a Host
          </button>
        </div>
      </motion.div>

      {/* Properties Preview */}
      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {properties.map((property) => (
          <motion.div
            key={property.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-sm text-gray-500">Explore this amazing stay!</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
