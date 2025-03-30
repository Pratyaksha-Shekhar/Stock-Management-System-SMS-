import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ViewProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data.products)
      } catch (error) {
        alert('Error fetching products: ' + error.message)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId) => {
    try {
      if (window.confirm('Are you sure you want to delete this product?')) {
        await axios.delete(`http://localhost:3000/api/products/${productId}`)
        setProducts(
          products.filter((product) => product.product_id !== productId)
        )
        alert('Product deleted successfully!')
      }
    } catch (error) {
      alert('Error deleting product: ' + error.message)
    }
  }

  const handleManageProduct = (action, productId) => {
    if (action === 'update') {
      navigate(`/products/update/${productId}`)
    } else if (action === 'delete') {
      handleDelete(productId)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">View Products</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Product ID</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Manage Product</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td className="border p-2">{product.product_id}</td>
              <td className="border p-2">{product.sku}</td>
              <td className="border p-2">{product.product_name}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">${product.unit_price}</td>
              <td className="border p-2">
                <select
                  onChange={(e) =>
                    handleManageProduct(e.target.value, product.product_id)
                  }
                  className="border-gray-300 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  <option value="update">Update Product</option>
                  <option value="delete">Delete Product</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
