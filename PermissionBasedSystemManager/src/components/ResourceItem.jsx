import React from 'react'
import './resource.css'

export default function ResourceItem({ resource, user, onUpdateStatus, onDelete }) {
  const meetsRole = user && (['Viewer','Editor','Admin'].indexOf(user.role) >= ['Viewer','Editor','Admin'].indexOf(resource.minRoleRequired))

  return (
    <div className="resource-item">
      <div className="resource-header">
        <div>
          <div className="resource-name">{resource.name}</div>
          <div className="resource-requirements">Requires: {resource.minRoleRequired}</div>
        </div>
        <div>
          {!meetsRole ? <span className="locked">🔒 Locked</span> : <span className="unlocked">🔓</span>}
        </div>
      </div>
      <div className="resource-actions">
        {meetsRole && (user.role === 'Admin' || user.role === 'Editor') ? (
          <button onClick={() => onUpdateStatus(resource.id, resource.status === 'active' ? 'archived' : 'active')}>Toggle Status</button>
        ) : null}
        {user && user.role === 'Admin' ? (
          <button onClick={() => onDelete(resource.id)}>Delete</button>
        ) : null}
      </div>
    </div>
  )
}
