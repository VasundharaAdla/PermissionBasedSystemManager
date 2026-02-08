import React, { useEffect, useState } from 'react'
import resourcesMock from '../data/resources'
import ResourceList from '../components/ResourceList'
import useRoleFilter from '../hooks/useRoleFilter'
import { useAuth } from '../context/AuthContext'
import './dashboard.css'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])

  useEffect(() => {
    // simulate fetch delay
    const t = setTimeout(() => {
      setResources(resourcesMock)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const visible = useRoleFilter(resources, user)

  const updateResourceStatus = (id, newStatus) => {
    // complex immutable update of a specific resource
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
  }

  const deleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id))
  }

  const active = visible.filter((r) => r.status === 'active')
  const archived = visible.filter((r) => r.status === 'archived')

  return (
    <div className="container">
      <div className="page-header">
        <h2>Resource Dashboard</h2>
        <div className="user-info">
          <span style={{marginRight:12}}>User: {user ? user.name + ' (' + user.role + ')' : '—'}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {loading ? <div className="loading">Loading resources…</div> : (
        <div className="lists">
          <section>
            <ResourceList title="Active Resources" resources={active} user={user} onUpdateStatus={updateResourceStatus} onDelete={deleteResource} />
          </section>
          <section>
            <ResourceList title="Archived Resources" resources={archived} user={user} onUpdateStatus={updateResourceStatus} onDelete={deleteResource} />
          </section>
        </div>
      )}
    </div>
  )
}
