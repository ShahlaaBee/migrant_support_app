import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [sosList, setSOSList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAllSOS = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:3000/api/sos/admin', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch all SOS')
        const data = await res.json()
        setSOSList(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllSOS()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/resources">
        <button>Manage Support Channels</button>
      </Link>
      <Link to="/admin/information-materials">
        <button>Manage Materials</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {sosList.map(sos => (
            <tr key={sos._id}>
              <td>
                {sos.user?.name || <em>Guest</em>}
              </td>
              <td>
                {sos.user?.email || <em>N/A</em>}
              </td>
              <td>
                {new Date(sos.triggeredAt).toLocaleString()}
              </td>
              <td>
                {sos.method}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard