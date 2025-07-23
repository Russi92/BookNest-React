
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const LIMIT = 15;

const Booking = () => {

  const [allBookings, setAllBookings] = useState([]);

  const [visibleBookings, setVisibleBookings] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  
  const [loadingMore, setLoadingMore] = useState(false);


  const observer = useRef();

  // Get All Data once
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('https://dev.gfoura.com/api/bookings');
        setAllBookings(res.data || []);
        setVisibleBookings(res.data.slice(0, LIMIT));
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Infinite Scroll observer
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBookings();
        }
      });

      if (node) observer.current.observe(node);
    },
    [visibleBookings, loading]
  );

  const loadMoreBookings = () => {
    if (loadingMore) return;
    setLoadingMore(true);
  
    setTimeout(() => {
      const nextPage = page + 1;
      const nextSlice = allBookings.slice(0, nextPage * LIMIT);
      if (nextSlice.length > visibleBookings.length) {
        setVisibleBookings(nextSlice);
        setPage(nextPage);
      }
      setLoadingMore(false);
    }, 1000); // لإعطاء فرصة للـ spinner يظهر لحظيًا
  };
  

  const handleDelete = async () => {
    try {
      await axios.delete(`https://dev.gfoura.com/api/bookings/${deletingId}`);

      const updated = allBookings.filter((b) => b.id !== deletingId);
      setAllBookings(updated);
      setVisibleBookings(updated.slice(0, page * LIMIT));
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setShowConfirm(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <table className="w-full text-sm border-collapse border border-gray-300">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Property ID</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {visibleBookings.map((booking, index) => (
            <tr
              key={booking.id}
              ref={index === visibleBookings.length - 1 ? lastElementRef : null}
              className="hover:bg-gray-50 transition"
            >
              <td className="border p-2 text-center">{booking.user_id}</td>
              <td className="border p-2 text-center">{booking.property_id}</td>
              <td className="border p-2 text-center">{booking.start_date}</td>
              <td className="border p-2 text-center">{booking.end_date}</td>
              <td className="border p-2 text-center">{booking.status || 'N/A'}</td>
              <td className="border p-2 text-center">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    setDeletingId(booking.id);
                    setShowConfirm(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loadingMore && (
        <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        )}


      {/* Modal for delete confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-3">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this booking?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
