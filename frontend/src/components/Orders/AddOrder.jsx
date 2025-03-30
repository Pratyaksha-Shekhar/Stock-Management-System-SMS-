import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AddOrder() {
  const [products, setProducts] = useState([])
  const [orderData, setOrderData] = useState({
    order_type: 'purchase', // Default to 'purchase'
    product_id: '',
    product_quantity: 1,
    total_price: 0,
  })

  useEffect(() => {
    // Fetch products for the dropdown
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error.message)
        alert('Error fetching products.')
      }
    }
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedProduct = products.find(
      (product) => product.product_id === parseInt(orderData.product_id)
    )
    const totalPrice = selectedProduct.unit_price * orderData.product_quantity

    try {
      const orderPayload = {
        order_type: orderData.order_type, // Added order type
        product_id: orderData.product_id,
        product_quantity: orderData.product_quantity,
        unit_price: selectedProduct.unit_price,
        total_price: totalPrice,
      }

      await axios.post('http://localhost:3000/api/orders', orderPayload)
      alert('Order placed successfully!')
      setOrderData({
        order_type: 'purchase',
        product_id: '',
        product_quantity: 1,
        total_price: 0,
      })
    } catch (error) {
      console.error('Error creating order:', error.message)
      alert('Failed to place the order.')
    }
  }

  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Type Dropdown */}
        <div>
          <label className="block text-gray-700">Order Type</label>
          <select
            name="order_type"
            value={orderData.order_type}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            required
          >
            <option value="purchase">Purchase</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-gray-700">Select Product</label>
          <select
            name="product_id"
            value={orderData.product_id}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select a Product --</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name} (${product.unit_price})
              </option>
            ))}
          </select>
        </div>

        {/* Product Quantity */}
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

        {/* Total Price */}
        <div>
          <label className="block text-gray-700">Total Price</label>
          <input
            type="text"
            value={
              orderData.product_id
                ? products.find(
                    (product) =>
                      product.product_id === parseInt(orderData.product_id)
                  )?.unit_price * orderData.product_quantity
                : 0
            }
            readOnly
            className="w-full border-gray-300 rounded-md bg-gray-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}
