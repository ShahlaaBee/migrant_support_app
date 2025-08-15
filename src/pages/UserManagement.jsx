import React, { useEffect, useState } from 'react'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('https://misos.onrender.com/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) {
          let errorMsg = 'Failed to fetch users'
          try {
            const errorData = await res.json()
            errorMsg = errorData.msg || JSON.stringify(errorData)
          } catch {
            errorMsg = await res.text()
          }
          throw new Error(errorMsg)
        }
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handlePromote = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`https://misos.onrender.com/api/users/${id}/promote`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        let errorMsg = 'Failed to promote user'
        try {
          const errorData = await res.json()
          errorMsg = errorData.msg || JSON.stringify(errorData)
        } catch {
          errorMsg = await res.text()
        }
        throw new Error(errorMsg)
      }
      const updatedUser = await res.json()
      setUsers(users.map(u => u._id === id ? { ...u, isAdmin: true } : u))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name || `${user.firstName} ${user.lastName}`} - {user.email}
            <span> {user.isAdmin ? ' (Admin)' : ''}</span>
            {!user.isAdmin && (
              <button onClick={() => handlePromote(user._id)}>
                Promote to Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserManagement
