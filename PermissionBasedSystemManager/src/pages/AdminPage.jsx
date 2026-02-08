import React from 'react'
import { useAuth } from '../context/AuthContext'
import './admin.css'

export default function AdminPage() {
  const { user } = useAuth()
  if (!user || user.role !== 'Admin') {
    return (
      <div className="admin-container">
        <h2>Access Denied</h2>
        <div className="admin-note">This page is only available to Admin users.</div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <h2>Admin Page</h2>
      <div className="admin-note">Only Admins can see this content.</div>
    </div>
  )
}
