import React from 'react'
import ResourceItem from './ResourceItem'

export default function ResourceList({ title, resources, user, onUpdateStatus, onDelete }) {
  return (
    <section style={{marginBottom:20}}>
      <h3>{title} ({resources.length})</h3>
      {resources.length === 0 ? <div style={{color:'#666'}}>No items</div> : null}
      {resources.map((r) => (
        <ResourceItem key={r.id} resource={r} user={user} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />
      ))}
    </section>
  )
}
