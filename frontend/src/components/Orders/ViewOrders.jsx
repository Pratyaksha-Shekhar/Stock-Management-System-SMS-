import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ViewOrders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders')
        setOrders(response.data.orders)
      } catch (error) {
        alert('Error fetching orders: ' + error.message)
      }
    }

    fetchOrders()
  }, [])

  const handleDelete = async (orderId) => {
    try {
      if (window.confirm('Are you sure you want to delete this order?')) {
        await axios.delete(`http://localhost:3000/api/orders/${orderId}`)
        setOrders(orders.filter((order) => order.order_id !== orderId)) // Update UI
        alert('Order deleted successfully')
      }
    } catch (error) {
      alert('Error deleting order: ' + error.message)
    }
  }

  const handleManageOrder = (action, orderId) => {
    if (action === 'update') {
      // Navigate to the update order page with the order ID
      navigate(`/orders/update/${orderId}`)
    } else if (action === 'delete') {
      handleDelete(orderId)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">View Orders</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Order Type</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Manage Order</th>{' '}
            {/* Manage Order Column */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="border p-2">{order.order_id}</td>
              <td className="border p-2">{order.order_type}</td>
              <td className="border p-2">{order.product_name}</td>
              <td className="border p-2">{order.product_quantity}</td>
              <td className="border p-2">${order.unit_price}</td>
              <td className="border p-2">${order.total_price}</td>
              <td className="border p-2">
                {new Date(order.timeanddate).toLocaleString()}
              </td>
              <td className="border p-2">
                {/* Manage Order Dropdown */}
                <select
                  onChange={(e) =>
                    handleManageOrder(e.target.value, order.order_id)
                  }
                  className="border-gray-300 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  <option value="update">Update Order</option>
                  <option value="delete">Delete Order</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
