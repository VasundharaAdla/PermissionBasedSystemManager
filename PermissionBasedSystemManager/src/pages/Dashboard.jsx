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
    // load resources for the current user from localStorage (per-user persistence)
    setLoading(true)
    const t = setTimeout(() => {
      if (user) {
        const key = `pbs_resources_${user.name}`
        const stored = localStorage.getItem(key)
        if (stored) {
          try {
            setResources(JSON.parse(stored))
          } catch (e) {
            setResources(resourcesMock)
          }
        } else {
          // first-time for this user: seed with default mock
          setResources(resourcesMock)
          localStorage.setItem(key, JSON.stringify(resourcesMock))
        }
      } else {
        // no user: clear local resources to avoid leaking user data
        setResources([])
      }
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [user])

  const visible = useRoleFilter(resources, user)

  const updateResourceStatus = (id, newStatus) => {
    setResources((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      if (user) localStorage.setItem(`pbs_resources_${user.name}`, JSON.stringify(next))
      return next
    })
  }

  const deleteResource = (id) => {
    setResources((prev) => {
      const next = prev.filter((r) => r.id !== id)
      if (user) localStorage.setItem(`pbs_resources_${user.name}`, JSON.stringify(next))
      return next
    })
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
