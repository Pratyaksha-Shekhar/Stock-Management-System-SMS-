import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ViewSuppliers() {
  const [suppliers, setSuppliers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/suppliers')
        setSuppliers(response.data.suppliers)
      } catch (error) {
        alert('Error fetching suppliers: ' + error.message)
      }
    }

    fetchSuppliers()
  }, [])

  const handleDelete = async (supplierId) => {
    try {
      if (window.confirm('Are you sure you want to delete this supplier?')) {
        await axios.delete(`http://localhost:3000/api/suppliers/${supplierId}`)
        setSuppliers(
          suppliers.filter((supplier) => supplier.supplier_id !== supplierId)
        )
        alert('Supplier deleted successfully!')
      }
    } catch (error) {
      alert('Error deleting supplier: ' + error.message)
    }
  }

  const handleManageSupplier = (action, supplierId) => {
    if (action === 'update') {
      navigate(`/suppliers/update/${supplierId}`)
    } else if (action === 'delete') {
      handleDelete(supplierId)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">View Suppliers</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Supplier ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact Details</th>
            <th className="border p-2">Manage Supplier</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.supplier_id}>
              <td className="border p-2">{supplier.supplier_id}</td>
              <td className="border p-2">{supplier.name}</td>
              <td className="border p-2">{supplier.contact_details}</td>
              <td className="border p-2">
                <select
                  onChange={(e) =>
                    handleManageSupplier(e.target.value, supplier.supplier_id)
                  }
                  className="border-gray-300 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  <option value="update">Update Supplier</option>
                  <option value="delete">Delete Supplier</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
