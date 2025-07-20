// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../api';

// const Properties = () => {
//   const [allProperties, setAllProperties] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(10);

//   // fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProperties();
//       setAllProperties(res.data || []);
//     };
//     fetchData();
//   }, []);

//   // handle scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       // لو المستخدم قرب آخر الصفحة بـ 100px
//       if (scrollTop + windowHeight + 100 >= fullHeight) {
//         setVisibleCount((prev) => prev + 30);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // العناصر اللي هنظهرها
//   const visibleProperties = allProperties.slice(0, visibleCount);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//       {visibleProperties.map((property) => {
//   let imagePath = '';

//   try {
//     if (property.images && property.images.length > 0) {
//       imagePath = `https://dev.gfoura.com/public/property_images/${property.images[0]}`;
//     }
//   } catch (error) {
//     console.error('Invalid images format', error);
//   }

//   return (
//     <div key={property.id} className="border p-4 rounded shadow">
//       {imagePath && (
//         <img
//           src={imagePath}
//           alt={property.title || property.name}
//           className="w-full h-48 object-cover rounded"
//           // onError={(e) => {
//           //   e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//           // }}
//         />
//       )}
//       <h2 className="text-xl font-semibold mt-2">{property.title || property.name}</h2>
//       <p>{property.description}</p>
//       <p className="mt-1 font-medium text-sm">Price: {property.price} $</p>
//     </div>
//   );
// })}

 
//       </div>
//     </div>
//   );
// };

// export default Properties;


// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../api';

// const Properties = () => {
//   const [allProperties, setAllProperties] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(10);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProperties();
//       setAllProperties(res.data || []);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       if (scrollTop + windowHeight + 100 >= fullHeight) {
//         setVisibleCount((prev) => prev + 30);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const visibleProperties = allProperties.slice(0, visibleCount);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {visibleProperties.map((property) => {
//           let imagePath = '';

//           try {
//             if (property.images) {
//               let parsedImages = [];

//               if (typeof property.images === 'string') {
//                 parsedImages = JSON.parse(property.images);
//               } else {
//                 parsedImages = property.images;
//               }

//               if (parsedImages.length > 0) {
//                 const cleaned = parsedImages[0].replace(/\\/g, '');
//                 imagePath = `https://dev.gfoura.com/public/${cleaned}`;
//               }
//             }
//           } catch (error) {
//             console.error('Invalid images format', error);
//           }

//           return (
//             <div key={property.id} className="border p-4 rounded shadow">
//               {imagePath && (
//                 <img
//                   src={imagePath}
//                   alt={property.title || property.name}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}
//               <h2 className="text-xl font-semibold mt-2">{property.title || property.name}</h2>
//               <p>{property.description}</p>
//               <p className="mt-1 font-medium text-sm">Price: {property.price} $</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Properties;


// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../api';

// const Properties = () => {
//   const [allProperties, setAllProperties] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(30); // أول 30 عنصر

//   // 1️⃣ تحميل كل البيانات مرة واحدة
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProperties();
//       setAllProperties(res.data || []);
//     };
//     fetchData();
//   }, []);

//   // 2️⃣ Infinite Scroll محلي (بناءً على Scroll)
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       if (scrollY + windowHeight + 100 >= fullHeight) {
//         setVisibleCount((prev) => {
//           // لو وصلنا للنهاية ما نزوّتش
//           if (prev >= allProperties.length) return prev;
//           return prev + 30;
//         });
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [allProperties]);

//   const visibleProperties = allProperties.slice(0, visibleCount);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {visibleProperties.map((property) => {
//           let imagePath = '';
//           try {
//             if (property.images && property.images.length > 0) {
//               imagePath = `https://dev.gfoura.com/public/property_images/${property.images[0].replace(/\\/g, '')}`;
//             }
//           } catch (error) {
//             console.error('Image path error:', error);
//           }

//           return (
//             <div key={property.id} className="border p-4 rounded shadow">
//               {imagePath && (
//                 <img
//                   src={imagePath}
//                   alt={property.title || property.name}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}
//               <h2 className="text-xl font-semibold mt-2">{property.title || property.name}</h2>
//               <p>{property.description}</p>
//               <p className="mt-1 font-medium text-sm">Price: {property.price} $</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* 3️⃣ رسالة في نهاية البيانات */}
//       {visibleCount >= allProperties.length && (
//         <p className="text-center mt-8 text-gray-500">No more properties to show.</p>
//       )}
//     </div>
//   );
// };

// export default Properties;

// loader spinner

// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../api';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import formatCurrency from '../formatCurrency'


// const Properties = () => {
//   const [allProperties, setAllProperties] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(30);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProperties();
//       setAllProperties(res.data || []);
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

//   const visibleProperties = allProperties.slice(0, visibleCount);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {visibleProperties.map((property) => {
//           let imagesArray = [];

//           try {
//             if (property.images) {
//               if (typeof property.images === 'string') {
//                 imagesArray = JSON.parse(property.images);
//               } else {
//                 imagesArray = property.images;
//               }

//               imagesArray = imagesArray.map((img) =>
//                 `https://dev.gfoura.com/public/${img.replace(/\\/g, '')}`
//               );
//             }
//           } catch (error) {
//             console.error('Invalid images format', error);
//           }

//           return (
//             <div key={property.id} className="border p-4 rounded shadow bg-white">
//               {imagesArray.length > 0 && (
//                 <Swiper
//                   modules={[Navigation]}
//                   navigation={true}
//                   spaceBetween={10}
//                   slidesPerView={1}
//                   className="relative
//                   [&_.swiper-button-next]:text-black 
//                   [&_.swiper-button-prev]:text-black
//                     [&_.swiper-button-next]:text-black-700
//                     [&_.swiper-button-prev]:text-black-700"
//                 >
//                   {imagesArray.map((src, index) => (
//                     <SwiperSlide key={index} className='text-sm'>
//                       <img
//                         src={src}
//                         alt={`Property ${property.id} - Image ${index + 1}`}
//                         className="w-full h-48 object-cover rounded"
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               )}
//               <h2 className="text-xl font-semibold mt-2">{property.title || property.name}</h2>
//               <p>{property.description}</p>
//               <p className="mt-1 font-medium text-sm">Price: {formatCurrency(property.price)}</p>
//             </div>
//           );
//         })}
//       </div>

//       {isLoading && (
//         <div className="flex justify-center items-center mt-8">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {!isLoading && visibleCount >= allProperties.length && (
//         <p className="text-center mt-8 text-gray-500">No more properties to show.</p>
//       )}
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

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // ✅ تحميل أولي

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProperties();
        setAllProperties(res.data || []);
      } catch (error) {
        console.error('Failed to fetch properties', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const visibleProperties = allProperties.slice(0, visibleCount);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {/* ✅ حالة التحميل الأولي */}
      {initialLoading ? (
        <p className="text-center text-gray-500 text-lg">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProperties.map((property) => {
            let imagesArray = [];

            try {
              if (property.images) {
                imagesArray =
                  typeof property.images === 'string'
                    ? JSON.parse(property.images)
                    : property.images;

                imagesArray = imagesArray.map((img) =>
                  `https://dev.gfoura.com/public/${img.replace(/\\/g, '')}`
                );
              }
            } catch (error) {
              console.error('Invalid images format', error);
            }

            return (
              <div key={property.id} className="border p-4 rounded shadow bg-white">
                {imagesArray.length > 0 && (
                  <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="relative 
                      [&_.swiper-button-next]:text-gray-700 
                      [&_.swiper-button-prev]:text-gray-700 
                      [&_.swiper-button-next]:text-xs 
                      [&_.swiper-button-prev]:text-xs"
                  >
                    {imagesArray.map((src, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={src}
                          alt={`Property ${property.id} - Image ${index + 1}`}
                          className="w-full h-48 object-cover rounded"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <h2 className="text-xl font-semibold mt-2">
                  {property.title || property.name}
                </h2>
                <p><span className='font-bold'>Description</span> : {property.description}</p>
                <p><span className='font-bold'>Location</span> : {property.location}</p>
                <p className="mt-1 font-medium text-sm">
                  <span className='font-bold'>Price</span>: {formatCurrency(property.price)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Spinner أثناء اللود عند السكروول */}
      {isLoading && !initialLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ✅ لا يوجد المزيد */}
      {!isLoading && !initialLoading && visibleCount >= allProperties.length && (
        <p className="text-center mt-8 text-gray-500">No more properties to show.</p>
      )}
    </div>
  );
};

export default Properties;







