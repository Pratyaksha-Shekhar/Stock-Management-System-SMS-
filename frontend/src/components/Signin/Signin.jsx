import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        credentials
      )
      localStorage.setItem('token', response.data.token) // Save token for authentication
      alert('Login successful!')
      navigate('/dashboard') // Redirect to dashboard or homepage
    } catch (err) {
      setError('Invalid username or password.')
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-xl w-full">
          <div className="ml-5 w-full p-8 lg:w-11/12">
            <p className="text-2xl xl:text-4xl font-extrabold text-blue-900 text-center">
              Welcome back!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </a>
              </div>
              <div className="mt-8">
                <button className="bg-[#FF204E] text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
