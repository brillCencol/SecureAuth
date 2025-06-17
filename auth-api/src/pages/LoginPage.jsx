import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (!res.ok) throw new Error(data.error || 'Login failed')

      navigate('/home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-10 py-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
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
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
