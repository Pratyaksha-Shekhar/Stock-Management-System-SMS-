import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ViewUsers() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users')
        setUsers(response.data.users)
      } catch (error) {
        alert('Error fetching users: ' + error.message)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:3000/api/users/${userId}`)
        setUsers(users.filter((user) => user.user_id !== userId))
        alert('User deleted successfully!')
      }
    } catch (error) {
      alert('Error deleting user: ' + error.message)
    }
  }

  const handleManageUser = (action, userId) => {
    if (action === 'update') {
      navigate(`/users/update/${userId}`)
    } else if (action === 'delete') {
      handleDelete(userId)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">View Users</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Manage User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="border p-2">{user.user_id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <select
                  onChange={(e) =>
                    handleManageUser(e.target.value, user.user_id)
                  }
                  className="border-gray-300 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  <option value="update">Update User</option>
                  <option value="delete">Delete User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
