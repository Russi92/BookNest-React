
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // ✅

  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'client',
  });

  const { searchTerm } = useSearch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://dev.gfoura.com/api/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dev.gfoura.com/api/users', newUser);
      await fetchUsers(); // ✅
      setNewUser({ name: '', phone: '', email: '', role: 'client' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding user:', err);
      if (err.response?.data?.messages) {
        console.log('Validation messages:', err.response.data.messages);
      }
    }
  };

  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://dev.gfoura.com/api/users/${selectedUserId}`);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
    } catch (err) {
      console.error('Error deleting user:', err);
    } finally {
      setShowConfirmModal(false);
      setSelectedUserId(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user }); // ✅ Fill old data
  };

const handleUpdateUser = async () => {
    try {
      await axios.post(`https://dev.gfoura.com/api/users/${editingUser.id}`, editingUser);
      await fetchUsers(); // ✅ إعادة تحميل البيانات من المصدر
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };
  
  

  const filteredUsers = users.filter((user) => {
    const text = `${user.name} ${user.email} ${user.role}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
      >
        {showForm ? 'Cancel' : 'Add New User'}
      </button>

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-6 bg-gray-100 p-4 rounded space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      )}

      {initialLoading ? (
        <p className="text-center text-gray-500 text-lg">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="relative border p-4 rounded shadow bg-white">
              <p><span className="font-bold">Name:</span> {user.name}</p>
              <p><span className="font-bold">Phone:</span> {user.phone}</p>
              <p><span className="font-bold">Email:</span> {user.email}</p>
              <p><span className="font-bold">Role:</span> {user.role}</p>

              <button
                onClick={() => confirmDelete(user.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <button
                onClick={() => handleEdit(user)}
                className="absolute top-2 right-10 text-blue-500 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!initialLoading && filteredUsers.length === 0 && (
        <p className="text-center mt-6 text-gray-400">No matching users found.</p>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">
            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p className="text-gray-600">Do you really want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4 relative">
            <h2 className="text-2xl font-semibold text-center">Edit User</h2>

            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setEditingUser(null)}
            >
              &times;
            </button>

            <input
              type="text"
              className="border p-2 rounded w-full"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={editingUser.phone}
              onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              type="email"
              className="border p-2 rounded w-full"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
            />
            <select
              className="border p-2 rounded w-full"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="client">Client</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={handleUpdateUser}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;





