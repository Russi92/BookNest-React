

// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../api';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import formatCurrency from '../formatCurrency';
// import { useSearch } from '../context/SearchContext'
// import axios from "axios";

// const Properties = () => {
//   const [allProperties, setAllProperties] = useState([]);
//   const { searchTerm } = useSearch();
//   const [visibleCount, setVisibleCount] = useState(50);
//   const [isLoading, setIsLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true); // ✅ تحميل أولي

//   const [showForm, setShowForm] = useState(false);

//   const [newProperty, setNewProperty] = useState({
//     name: "",
//     description: "",
//     location: "",
//     price: "",
//     image: null,
//     });
// const [creating, setCreating] = useState(false);

// const handleCreateProperty = async () => {
//   setCreating(true);

//   try {
//     if (
//       !newProperty.name ||
//       !newProperty.description ||
//       !newProperty.location ||
//       !newProperty.price ||
//       !newProperty.image
//     ) {
//       alert("Please fill all fields and select an image.");
//       setCreating(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("user_id", 1); // يفضل لاحقًا تجيب الـ user_id من ال login
//     formData.append("name", newProperty.name);
//     formData.append("description", newProperty.description);
//     formData.append("location", newProperty.location);
//     formData.append("price", newProperty.price);
//     formData.append("images[]", newProperty.image);

//     const res = await axios.post("https://dev.gfoura.com/api/properties", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("Full API Response:", res.data);

//     alert("Property added successfully!");

//     // إعادة تعيين النموذج
//     setNewProperty({
//       name: "",
//       description: "",
//       location: "",
//       price: "",
//       image: null,
//     });

//     setShowForm(false);

//     // ✅ إضافة العقار الجديد في بداية القائمة
//     if (res.data && res.data.property) {
//       const newProp = res.data.property;

//       // ✅ تأكد من الصور
//       if (typeof newProp.images === 'string') {
//         try {
//           newProp.images = JSON.parse(newProp.images);
//         } catch (e) {
//           newProp.images = [];
//         }
//       }

//       // ✅ خزّن في localStorage (لو محتاج ترجعله بعد reload)
//       delete newProp.id;
//       localStorage.setItem('newProperty', JSON.stringify(newProp));

//       // ✅ ضيف العقار الجديد
//       setAllProperties((prev) => {
//         const updated = [newProp, ...prev];

//         // ✅ تأكد إنه هيظهر ضمن العدد الظاهر
//         setVisibleCount((prevCount) => Math.max(prevCount + 1, updated.length));

//         return updated;
//       });

//       // ✅ ارجع لأعلى الصفحة
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       console.warn("No property data returned from API!");
//     }

//   } catch (error) {
//     console.error("Error creating property:", error);
//     alert("Failed to add property. Check fields or server.");
//   } finally {
//     setCreating(false);
//   }
// };








//   const highlightMatch = (text, keyword) => {
//     if (!keyword) return text;
//     const regex = new RegExp(`(${keyword})`, 'gi');
//     return text?.replace(regex, '<mark class="bg-yellow-300">$1</mark>');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getProperties();
//         const storedNewProperty = JSON.parse(localStorage.getItem('newProperty'));
        
//         let fullList = res.data || [];
  
//         // ✅ ضيف العقار المحفوظ مؤقتًا إذا مش موجود في قائمة الـ API
//         if (
//           storedNewProperty &&
//           !fullList.some(
//             (p) =>
//               p.name === storedNewProperty.name &&
//               p.location === storedNewProperty.location &&
//               Number(p.price) === Number(storedNewProperty.price)
//           )
//         ) {
        
//           // ✅ تأكد من معالجة الصور داخل العقار المحفوظ
//           let imagesArray = [];
//           try {
//             if (storedNewProperty.images) {
//               imagesArray =
//                 typeof storedNewProperty.images === 'string'
//                   ? JSON.parse(storedNewProperty.images)
//                   : storedNewProperty.images;
        
//               storedNewProperty.images = imagesArray;
//             }
//           } catch (err) {
//             console.error("Failed to parse stored images", err);
//             storedNewProperty.images = [];
//           }
        
//           fullList = [storedNewProperty, ...fullList];
//         }
        
  
//         setAllProperties(fullList);
//       } catch (error) {
//         console.error('Failed to fetch properties', error);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
  
  

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       if (
//         scrollTop + windowHeight + 100 >= fullHeight &&
//         !isLoading &&
//         visibleCount < allProperties.length
//       ) {
//         setIsLoading(true);
//         setTimeout(() => {
//           setVisibleCount((prev) => Math.min(prev + 30, allProperties.length));
//           setIsLoading(false);
//         }, 1000);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isLoading, visibleCount, allProperties.length]);

//   const filteredProperties = allProperties.filter(p => {
//     const text = `${p.title || p.name} ${p.description} ${p.location}`.toLowerCase();
//     return text.includes(searchTerm.toLowerCase());
//   });
  
//   const visibleProperties = filteredProperties.slice(0, visibleCount);


//   return (
//     <div className="p-4">

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           + Add Property
//         </button>
//       </div>


//       <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

//       {/* ✅ حالة التحميل الأولي */}
//       {initialLoading ? (
//         <p className="text-center text-gray-500 text-lg">Loading data...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {visibleProperties.map((property) => {
//             let imagesArray = [];

//             try {
//               if (property.images) {
//                 imagesArray =
//                   typeof property.images === 'string'
//                     ? JSON.parse(property.images)
//                     : property.images;

//                 imagesArray = imagesArray.map((img) =>
//                   `https://dev.gfoura.com/public/${img.replace(/\\/g, '')}`
//                 );
//               }
//             } catch (error) {
//               console.error('Invalid images format', error);
//             }

//             return (
//               <div key={property.id} className="border p-4 rounded shadow bg-white">
//                 {imagesArray.length > 0 && (
//                   <Swiper
//                     modules={[Navigation]}
//                     navigation={true}
//                     spaceBetween={10}
//                     slidesPerView={1}
//                     className="relative 
//                       [&_.swiper-button-next]:text-gray-700 
//                       [&_.swiper-button-prev]:text-gray-700 
//                       [&_.swiper-button-next]:text-xs 
//                       [&_.swiper-button-prev]:text-xs"
//                   >
//                     {imagesArray.map((src, index) => (
//                       <SwiperSlide key={index}>
//                         <img
//                           src={src}
//                           alt={`Property ${property.id} - Image ${index + 1}`}
//                           className="w-full h-48 object-cover rounded"
//                         />
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 )}
//                 <h2
//                   className="text-xl font-semibold mt-2"
//                   dangerouslySetInnerHTML={{ __html: highlightMatch(property.title || property.name, searchTerm) }}
//                 />

//                 <p dangerouslySetInnerHTML={{ __html: highlightMatch(property.description, searchTerm) }} />
//                 <p dangerouslySetInnerHTML={{ __html: highlightMatch(property.location, searchTerm) }} />

//                 <p><span className='font-bold'>Description</span> : {property.description}</p>
//                 <p><span className='font-bold'>Location</span> : {property.location}</p>
//                 <p className="mt-1 font-medium text-sm">
//                   <span className='font-bold'>Price</span>: {formatCurrency(property.price)}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ✅ Spinner أثناء اللود عند السكروول */}
//       {isLoading && !initialLoading && (
//         <div className="flex justify-center items-center mt-8">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* ✅ لا يوجد المزيد */}
//       {!isLoading && !initialLoading && visibleCount >= allProperties.length && (
//         <p className="text-center mt-8 text-gray-500">No more properties to show.</p>
//       )}

// {showForm && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//       <h2 className="text-xl font-bold mb-4">Add New Property</h2>
//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border p-2 rounded"
//           value={newProperty.name}
//           onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           className="w-full border p-2 rounded"
//           value={newProperty.description}
//           onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           className="w-full border p-2 rounded"
//           value={newProperty.location}
//           onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           value={newProperty.price}
//           onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
//         />

//         {/* ✅ حقل رفع الصورة */}
//         <input
//           type="file"
//           accept="image/*"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setNewProperty({ ...newProperty, image: e.target.files[0] })}
//         />

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={() => setShowForm(false)}
//             className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleCreateProperty}
//             disabled={creating}
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             {creating ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//     </div>

    
//   );
  
// };

// export default Properties;




import React, { useEffect, useState } from 'react';
import { getProperties } from '../api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import formatCurrency from '../formatCurrency';
import { useSearch } from '../context/SearchContext';
import axios from 'axios';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const { searchTerm } = useSearch();
  const [visibleCount, setVisibleCount] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    image: null,
  });
  const [creating, setCreating] = useState(false);

  // ✅ Key for storing newly added properties in localStorage
  const NEWLY_ADDED_PROPERTIES_KEY = 'newlyAddedProperties';
  // ✅ Base URL for images
  const IMAGE_BASE_URL = 'https://dev.gfoura.com/public/';

  // ✅ Helper function to format image URLs
  const formatImageUrls = (imagesData) => {
    if (!imagesData) return [];
    
    let imagesArray = [];
    try {
      // If it's a string, try parsing it
      if (typeof imagesData === 'string') {
        imagesArray = JSON.parse(imagesData);
      } else if (Array.isArray(imagesData)) {
        // If it's already an array
        imagesArray = imagesData;
      }
    } catch (e) {
      console.warn("Failed to parse images data:", e, imagesData);
      return [];
    }

    // Map to full URLs, handling backslashes
    return imagesArray.map((img) =>
      `${IMAGE_BASE_URL}${img.replace(/\\/g, '')}`
    );
  };


  // ✅ Function to clean old stored properties from localStorage (adjusted)
  const cleanOldStoredProperties = () => {
    const storedProperties = localStorage.getItem(NEWLY_ADDED_PROPERTIES_KEY);
    if (storedProperties) {
      try {
        const parsed = JSON.parse(storedProperties);
        const dayInMs = 24 * 60 * 60 * 1000; // 24 hours

        const cleanedProperties = parsed.filter(
          (prop) => prop.createdAt && (Date.now() - prop.createdAt <= dayInMs)
        );

        if (cleanedProperties.length !== parsed.length) {
          localStorage.setItem(
            NEWLY_ADDED_PROPERTIES_KEY,
            JSON.stringify(cleanedProperties)
          );
          console.log('🗑️ Removed old properties from localStorage');
        }
        return cleanedProperties;
      } catch (error) {
        console.error('Error reading stored properties:', error);
        localStorage.removeItem(NEWLY_ADDED_PROPERTIES_KEY); // Clear on error
        return [];
      }
    }
    return [];
  };

  // ✅ Function to handle creating a new property (modified)
  const handleCreateProperty = async () => {
    setCreating(true);

    try {
      // ✅ Validate form data
      if (
        !newProperty.name?.trim() ||
        !newProperty.description?.trim() ||
        !newProperty.location?.trim() ||
        !newProperty.price ||
        !newProperty.image
      ) {
        alert('Please fill all fields and select an image.');
        setCreating(false);
        return;
      }

      // ✅ Prepare form data
      const formData = new FormData();
      formData.append('user_id', 1);
      formData.append('name', newProperty.name.trim());
      formData.append('description', newProperty.description.trim());
      formData.append('location', newProperty.location.trim());
      formData.append('price', newProperty.price);
      formData.append('images[]', newProperty.image);

      // ✅ Send API request
      const res = await axios.post(
        'https://dev.gfoura.com/api/properties',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Full API Response:', res.data);

      if (res.data && res.data.property) {
        const apiProperty = res.data.property;

        // ✅ Process images immediately for the newly added property
        const formattedImages = formatImageUrls(apiProperty.images);

        // ✅ Set up new property with unique temp ID
        const newPropWithFormattedImages = {
          ...apiProperty,
          tempId: `temp_${Date.now()}`, // Unique temporary ID
          isNewlyAdded: true, // New property flag
          createdAt: Date.now(), // Creation timestamp
          images: formattedImages, // Use the formatted images array
        };

        // ✅ Get existing newly added properties from localStorage
        const existingNewlyAdded = JSON.parse(
          localStorage.getItem(NEWLY_ADDED_PROPERTIES_KEY) || '[]'
        );

        // ✅ Add the new property to the array and save to localStorage
        const updatedNewlyAdded = [newPropWithFormattedImages, ...existingNewlyAdded];
        localStorage.setItem(
          NEWLY_ADDED_PROPERTIES_KEY,
          JSON.stringify(updatedNewlyAdded)
        );
        console.log('✅ New property added to localStorage list');

        // ✅ Add property to the front of the list in state
        setAllProperties((prevProperties) => {
          const updatedProperties = [newPropWithFormattedImages, ...prevProperties];
          console.log('✅ Property added to front of list');
          return updatedProperties;
        });

        // ✅ Ensure property is visible in the visible count
        setVisibleCount((prevCount) => Math.max(prevCount, 1));

        // ✅ Reset form and close modal
        setNewProperty({
          name: '',
          description: '',
          location: '',
          price: '',
          image: null,
        });
        setShowForm(false);

        // ✅ Scroll to top to see new property
        window.scrollTo({ top: 0, behavior: 'smooth' });

        alert('Property added successfully!');
      } else {
        console.warn('No property data returned from server!');
        alert('Property added but you may need to refresh the page to see it.');
      }
    } catch (error) {
      console.error('Error creating property:', error);

      if (error.response) {
        console.error('Server response:', error.response.data);
        alert(
          `Failed to add property: ${
            error.response.data.message || 'Server error'
          }`
        );
      } else if (error.request) {
        alert('Failed to connect to server. Check your internet connection.');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setCreating(false);
    }
  };

  // ✅ Function to highlight search matches in text
  const highlightMatch = (text, keyword) => {
    if (!keyword || !text) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-300">$1</mark>');
  };

  // ✅ Load data when app starts (modified)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting to load properties...');

        // ✅ Clean old data and get currently valid stored properties
        const storedNewlyAddedProperties = cleanOldStoredProperties();
        console.log(
          `📦 Found ${storedNewlyAddedProperties.length} stored new properties`
        );

        // ✅ Fetch properties from server
        const res = await getProperties();
        let serverProperties = res.data || [];

        console.log(`📋 Fetched ${serverProperties.length} properties from server`);

        // ✅ Filter out any server properties that conflict with newly added ones (by ID)
        // This prevents duplicates if the newly added property is immediately returned by the API on refresh
        const serverPropertiesFiltered = serverProperties.filter(
          (serverProp) =>
            !storedNewlyAddedProperties.some(
              (newProp) => newProp.id && newProp.id === serverProp.id
            )
        );

        // ✅ Combine stored and server properties, formatting all images
        let finalProperties = [
          ...storedNewlyAddedProperties,
          ...serverPropertiesFiltered,
        ].map(prop => ({
          ...prop,
          images: formatImageUrls(prop.images) // Apply formatting to all properties
        }));

        setAllProperties(finalProperties);
        console.log(`✅ Updated properties list (${finalProperties.length} properties)`);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
        alert('Failed to load properties. Please refresh the page.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // ✅ Handle infinite scroll loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight + 100 >= fullHeight &&
        !isLoading &&
        visibleCount < allProperties.length
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 30, allProperties.length));
          setIsLoading(false);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, visibleCount, allProperties.length]);

  // ✅ Filter properties based on search
  const filteredProperties = allProperties.filter((property) => {
    const searchText = `${property.title || property.name || ''} ${
      property.description || ''
    } ${property.location || ''}`.toLowerCase();
    return searchText.includes(searchTerm.toLowerCase());
  });

  // ✅ Visible properties based on count
  const visibleProperties = filteredProperties.slice(0, visibleCount);

  return (
    <div className="p-4">
      {/* ✅ Add new property button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          + Add Property
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Available Properties
      </h1>

      {/* ✅ Initial loading state */}
      {initialLoading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ✅ Display properties */}
          {visibleProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProperties.map((property, index) => {
                // Images are now already parsed and formatted in state
                const imagesArray = property.images || [];

                return (
                  <div
                    key={property.id || property.tempId || index}
                    className={`border rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
                      property.isNewlyAdded
                        ? 'ring-2 ring-green-500 ring-opacity-50'
                        : ''
                    }`}
                  >
                    {/* ✅ Image slider */}
                    {imagesArray.length > 0 && (
                      <div className="relative">
                        <Swiper
                          modules={[Navigation]}
                          navigation={true}
                          spaceBetween={0}
                          slidesPerView={1}
                          className="h-48 [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white 
                                   [&_.swiper-button-next]:bg-black [&_.swiper-button-prev]:bg-black
                                   [&_.swiper-button-next]:bg-opacity-50 [&_.swiper-button-prev]:bg-opacity-50
                                   [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full
                                   [&_.swiper-button-next]:w-8 [&_.swiper-button-prev]:w-8
                                   [&_.swiper-button-next]:h-8 [&_.swiper-button-prev]:h-8
                                   [&_.swiper-button-next]:text-sm [&_.swiper-button-prev]:text-sm"
                        >
                          {imagesArray.map((src, imgIndex) => (
                            <SwiperSlide key={imgIndex}>
                              <img
                                src={src}
                                alt={`${property.title || property.name} - Image ${
                                  imgIndex + 1
                                }`}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  e.target.src =
                                    'https://via.placeholder.com/300x200?text=Image+Not+Available';
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {/* ✅ New property badge */}
                        {property.isNewlyAdded && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                            New
                          </div>
                        )}
                      </div>
                    )}

                    {/* ✅ Property information */}
                    <div className="p-4">
                      <h2
                        className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(
                            property.title || property.name || 'Unnamed Property',
                            searchTerm
                          ),
                        }}
                      />

                      <div className="space-y-2 text-gray-600">
                        <p className="text-sm">
                          <span className="font-medium text-gray-700">Description:</span>
                          <span
                            className="ml-1"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(
                                property.description || 'No description',
                                searchTerm
                              ),
                            }}
                          />
                        </p>

                        <p className="text-sm">
                          <span className="font-medium text-gray-700">Location:</span>
                          <span
                            className="ml-1"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(
                                property.location || 'Not specified',
                                searchTerm
                              ),
                            }}
                          />
                        </p>

                        <p className="text-lg font-bold text-green-600">
                          <span className="font-medium text-gray-700 text-sm">Price:</span>{' '}
                          {formatCurrency(property.price || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your search.</p>
            </div>
          )}
        </>
      )}

      {/* ✅ Loading spinner during scroll */}
      {isLoading && !initialLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading more...</span>
        </div>
      )}

      {/* ✅ End of properties message */}
      {!isLoading &&
        !initialLoading &&
        visibleCount >= filteredProperties.length &&
        filteredProperties.length > 0 && (
          <p className="text-center mt-8 text-gray-500">All properties displayed.</p>
        )}

      {/* ✅ Add new property form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-90vh overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Property</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="Enter property name"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter property description"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-20 resize-none"
                  value={newProperty.description}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter property location"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={newProperty.location}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter property price"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={newProperty.price}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, price: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, image: e.target.files[0] })
                  }
                />
                {newProperty.image && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {newProperty.image.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewProperty({
                    name: '',
                    description: '',
                    location: '',
                    price: '',
                    image: null,
                  });
                }}
                className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-200"
                disabled={creating}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProperty}
                disabled={creating}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {creating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;


