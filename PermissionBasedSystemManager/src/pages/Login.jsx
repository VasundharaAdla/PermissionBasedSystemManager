import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('Viewer')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    login(name || 'Anonymous', role)
    navigate('/dashboard')
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="login-field">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="login-field">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Viewer</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="login-actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
