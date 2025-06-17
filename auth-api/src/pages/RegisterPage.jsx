import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (!res.ok) throw new Error(data.error || 'Registration failed')

      setSuccess(data.message || 'Registered successfully!')
      setForm({ name: '', email: '', password: '' })

      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-10 py-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="border rounded-md px-4 py-2 w-64"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border rounded-md px-4 py-2 w-64"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border rounded-md px-4 py-2 w-64"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
