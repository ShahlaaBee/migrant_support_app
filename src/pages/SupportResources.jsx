import React, { useState, useEffect } from 'react'

const Resources = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const headers = { 'Content-Type': 'application/json' }
        const token = localStorage.getItem('token')
        if (token) headers.Authorization = `Bearer ${token}`

        const res = await fetch('https://misos.onrender.com/api/support', { headers })

        if (!res.ok) {
          let errorMsg = 'Failed to fetch resources'
          try {
            const errorData = await res.json()
            errorMsg = errorData.msg || JSON.stringify(errorData)
          } catch {
            errorMsg = await res.text()
          }
          throw new Error(errorMsg)
        }
        const data = await res.json()
        setResources(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  if (loading) return <p>Loading resources...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Support Channels</h1>
      <ul>
        {resources.map(resource => (
          <li key={resource._id}>
            <strong>{resource.title}</strong> ({resource.type})<br />
            {resource.description && <span>{resource.description}<br /></span>}
            {resource.contact && <span>Contact: {resource.contact}<br /></span>}
            {resource.location && <span>Location: {resource.location}</span>}
            {resource.link && (
              <>
                <br />
                <a href={resource.link} target="_blank" rel="noopener noreferrer">Visit Resource</a>
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Resources
