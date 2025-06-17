import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('jwt') // or any token/cookie check

  return isAuthenticated ? children : <Navigate to="/" />
}
