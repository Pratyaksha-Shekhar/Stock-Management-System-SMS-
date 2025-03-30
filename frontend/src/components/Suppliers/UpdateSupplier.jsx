import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UpdateSupplier() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
  })

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/suppliers/${id}`
        )
        setFormData(response.data.supplier)
      } catch (error) {
        alert('Error fetching supplier: ' + error.message)
      }
    }
    fetchSupplier()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/api/suppliers/${id}`, formData)
      alert('Supplier updated successfully!')
      navigate('/suppliers')
    } catch (error) {
      alert('Error updating supplier: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Supplier Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Contact Details</label>
          <textarea
            name="contact_details"
            value={formData.contact_details}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Supplier
        </button>
      </form>
    </div>
  )
}
