const resources = [
  { id: 'r1', name: 'User Directory', minRoleRequired: 'Viewer', status: 'active' },
  { id: 'r2', name: 'Billing Settings', minRoleRequired: 'Editor', status: 'active' },
  { id: 'r3', name: 'System Config', minRoleRequired: 'Admin', status: 'active' },
  { id: 'r4', name: 'Archived Logs', minRoleRequired: 'Admin', status: 'archived' },
  { id: 'r5', name: 'Content Drafts', minRoleRequired: 'Editor', status: 'archived' }
]

export default resources
