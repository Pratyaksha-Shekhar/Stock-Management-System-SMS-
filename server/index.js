const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

// Import controllers
const {
  loginUser,
  registerUser,
  showAllUsers,
  showUser,
  removeUser,
} = require('./controllers/userController')

const {
  registerProduct,
  showAllProducts,
  showProductByName,
  removeProduct,
  S,
} = require('./controllers/productController')

const {
  createOrder,
  getAllOrders,
  getOrder,
  removeOrder,
} = require('./controllers/orderController')

const {
  addSupplier,
  getAllSuppliers,
  getSupplier,
  removeSupplier,
} = require('./controllers/supplierConroller')

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
// User routes
app.post('/api/login', loginUser)
app.post('/api/users', registerUser) // Register a user
app.get('/api/users', showAllUsers) // Get all users
app.get('/api/users/:id', showUser) // Get a specific user
app.delete('/api/users/:id', removeUser) // Delete a user

// Product routes
app.post('/api/products', registerProduct) // Add a product
app.get('/api/products', showAllProducts) // Get all products
app.get('/api/products/:q', showProductByName) // Get a specific product
app.delete('/api/products/:id', removeProduct) // Delete a product

// Order routes
app.post('/api/orders', createOrder) // Create an order
app.get('/api/orders', getAllOrders) // Get all orders
app.get('/api/orders/:id', getOrder) // Get a specific order
app.delete('/api/orders/:id', removeOrder) // Delete an order

// Supplier routes
app.post('/api/suppliers', addSupplier) // Add a supplier
app.get('/api/suppliers', getAllSuppliers) // Get all suppliers
app.get('/api/suppliers/:id', getSupplier) // Get a specific supplier
app.delete('/api/suppliers/:id', removeSupplier) // Delete a supplier

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
