import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UpdateOrder() {
  const { id } = useParams() // Get the order ID from the route
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState({
    product_quantity: 1,
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${id}`
        )
        setOrderData(response.data.order)
      } catch (error) {
        alert('Error fetching order details: ' + error.message)
      }
    }
    fetchOrder()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/api/orders/${id}`, orderData)
      alert('Order updated successfully!')
      navigate('/orders')
    } catch (error) {
      alert('Error updating order: ' + error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderData((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="product_quantity"
            value={orderData.product_quantity}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Order
        </button>
      </form>
    </div>
  )
}
