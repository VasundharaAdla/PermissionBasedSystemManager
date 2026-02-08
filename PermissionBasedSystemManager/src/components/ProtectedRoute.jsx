import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, minRole }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (minRole) {
    const order = { Viewer: 1, Editor: 2, Admin: 3 }
    if ((order[user.role] || 0) < (order[minRole] || 0)) {
      return <Navigate to="/dashboard" replace />
    }
  }
  return children
}
