import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = useCallback((name, role) => {
    const token = Date.now().toString()
    const payload = { name, role, token }
    localStorage.setItem('pbs_user', JSON.stringify(payload))
    setUser(payload)
    return payload
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('pbs_user')
    setUser(null)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('pbs_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  // NOTE: cross-tab storage listener removed to match requested minimal structure.

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
