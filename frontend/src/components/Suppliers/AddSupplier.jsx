import { useState } from 'react'
import axios from 'axios'

export default function AddSupplier() {
  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/suppliers', formData)
      alert('Supplier added successfully!')
      setFormData({ name: '', contact_details: '' })
    } catch (error) {
      alert('Error adding supplier: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
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
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Supplier
        </button>
      </form>
    </div>
  )
}
