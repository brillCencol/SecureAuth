import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'GET',
        credentials: 'include'
      })
      navigate('/')
    } catch (err) {
      console.error('Signout failed:', err)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center" style={{ minWidth: '320px' }}>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to SecureAuth</h1>
        <p className="text-gray-600 mb-6">You are successfully logged in.</p>
        <button
          onClick={handleSignout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
