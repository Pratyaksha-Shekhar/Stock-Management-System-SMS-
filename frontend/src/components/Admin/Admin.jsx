import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token') // Remove token from storage
    alert('Logged out successfully')
    navigate('/login') // Redirect to login page
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="relative">
          <button className="flex items-center focus:outline-none">
            {/* Profile Icon */}
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-full h-10 w-10"
            />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <ul className="py-1 text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Manage Users */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Manage Users</h3>
            <p className="text-gray-600 mb-4">
              View, update, or delete registered users.
            </p>
            <button
              onClick={() => navigate('/users')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Users
            </button>
          </div>

          {/* Manage Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Manage Products</h3>
            <p className="text-gray-600 mb-4">
              Add, update, or delete products in the inventory.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Products
            </button>
          </div>

          {/* Manage Suppliers */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Manage Suppliers</h3>
            <p className="text-gray-600 mb-4">
              Add, update, or delete supplier information.
            </p>
            <button
              onClick={() => navigate('/suppliers')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Suppliers
            </button>
          </div>

          {/* Manage Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Manage Orders</h3>
            <p className="text-gray-600 mb-4">
              View, update, or delete customer orders.
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Orders
            </button>
          </div>

          {/* View All Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">View All Orders</h3>
            <p className="text-gray-600 mb-4">
              See a complete list of all customer orders.
            </p>
            <button
              onClick={() => navigate('/orders/view')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View All Orders
            </button>
          </div>
          {/* View All Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">View All Products</h3>
            <p className="text-gray-600 mb-4">
              See a complete list of all Products.
            </p>
            <button
              onClick={() => navigate('/products/view')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View All Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
