import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:3000/api/support"

const AdminResourceList = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newResource, setNewResource] = useState({ title: '', type: '', description: '', link: '' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', type: '', description: '', link: '' })

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchResources()

  }, [])

  const fetchResources = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResources(Array.isArray(data) ? data : [])
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error fetching resources'
      )
      setResources([]) 
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(API_URL, newResource, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewResource({ title: '', type: '', description: '', link: '' })
      fetchResources()
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error creating resource'
      )
      console.error('Error creating resource:', error)
    }
  }

  const handleDelete = async (id) => {
    setError('')
    if (!window.confirm('Are you sure you want to delete this resource?')) return
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResources(resources.filter((res) => res._id !== id))
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error deleting resource'
      )
      console.error('Error deleting resource:', error)
    }
  }

  const handleEditSave = async (id) => {
    setError('')
    try {
      await axios.put(`${API_URL}/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditingId(null)
      fetchResources()
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error updating resource'
      )
      console.error('Error updating resource:', error)
    }
  }

  if (loading) return <p>Loading resources...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div>
      <h2>Admin Resource Management</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newResource.type}
          onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newResource.description}
          onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Link"
          value={newResource.link}
          onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
          required
        />
        <button type="submit">Add Resource</button>
      </form>

      <ul>
        {(Array.isArray(resources) ? resources : []).map((res) => (
          <li key={res._id}>
            {editingId === res._id ? (
              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
                <input
                  type="url"
                  value={editData.link}
                  onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                />
                <button onClick={() => handleEditSave(res._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{res.title}</strong> - {res.type} - {res.description} <br />
                <a href={res.link} target="_blank" rel="noopener noreferrer">
                  Visit Resource
                </a>
                <br />
                <button
                  onClick={() => {
                    setEditingId(res._id)
                    setEditData({
                      title: res.title,
                      type: res.type,
                      description: res.description,
                      link: res.link
                    })
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(res._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminResourceList