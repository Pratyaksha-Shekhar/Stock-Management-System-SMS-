import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Layout from './Layout'
import Home from './components/Home'
import SignIn from './components/Signin/Signin'
import AdminPage from './components/Admin/Admin'

// product routes
import AddProduct from './components/Products/AddProduct'
import UpdateProduct from './components/Products/UpdateProduct'
import ViewProducts from './components/Products/ViewProducts'
import AddOrder from './components/Orders/AddOrder'
import UpdateOrder from './components/Orders/UpdateOrder'
import ViewOrders from './components/Orders/ViewOrders'
import AddSupplier from './components/Suppliers/AddSupplier'
import UpdateSupplier from './components/Suppliers/UpdateSupplier'
import ViewSuppliers from './components/Suppliers/ViewSuppliers'
import AddUser from './components/Users/AddUser'
import UpdateUser from './components/Users/UpdateUser'
import ViewUsers from './components/Users/ViewUsers'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />

      {/* users routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/view" element={<ViewUsers />} />
      <Route path="/users/update" element={<UpdateUser />} />
      <Route path="/users/admin" element={<AdminPage />} />

      {/* products Routes */}
      <Route path="/products/view" element={<ViewProducts />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/update" element={<UpdateProduct />} />

      {/* Orders Routes  */}
      <Route path="/orders/add" element={<AddOrder />} />
      <Route path="/orders/view" element={<ViewOrders />} />
      <Route path="/orders/update" element={<UpdateOrder />} />

      {/* Suppleirs Routs */}
      <Route path="/suppleirs/add" element={<AddSupplier />} />
      <Route path="/suppleirs/view" element={<ViewSuppliers />} />
      <Route path="/suppleirs/update" element={<UpdateSupplier />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
