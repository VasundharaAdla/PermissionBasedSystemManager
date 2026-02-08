const roleRank = (r) => {
  if (!r) return 0
  const map = { Viewer: 1, Editor: 2, Admin: 3 }
  return map[r] || 0
}

export default function useRoleFilter(resources = [], user) {
  if (!user) return []
  const rank = roleRank(user.role)
  return resources.filter((res) => rank >= roleRank(res.minRoleRequired))
}
