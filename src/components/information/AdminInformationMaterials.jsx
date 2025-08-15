import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = "https://misos.onrender.com/information-materials"

const AdminInformationMaterials = () => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newMaterial, setNewMaterial] = useState({ title: '', summary: '', link: '' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', summary: '', link: '' })

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.get(API_URL)
      setMaterials(Array.isArray(data) ? data : [])
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error fetching information materials'
      )
      setMaterials([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(API_URL, newMaterial, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewMaterial({ title: '', summary: '', link: '' })
      fetchMaterials()
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error creating information material'
      )
    }
  }

  const handleDelete = async (id) => {
    setError('')
    if (!window.confirm('Are you sure you want to delete this material?')) return
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMaterials(materials.filter((mat) => mat._id !== id))
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error deleting information material'
      )
    }
  }

  const handleEditSave = async (id) => {
    setError('')
    try {
      await axios.put(`${API_URL}/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditingId(null)
      fetchMaterials()
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        error.response?.data ||
        error.message ||
        'Error updating information material'
      )
    }
  }

  if (loading) return <p>Loading information materials...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div>
      <h2>Manage Information Materials</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={newMaterial.title}
          onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={newMaterial.summary}
          onChange={(e) => setNewMaterial({ ...newMaterial, summary: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Link"
          value={newMaterial.link}
          onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
          required
        />
        <button type="submit">Add Material</button>
      </form>

      <ul>
        {(Array.isArray(materials) ? materials : []).map((mat) => (
          <li key={mat._id}>
            {editingId === mat._id ? (
              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editData.summary}
                  onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                />
                <input
                  type="url"
                  value={editData.link}
                  onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                />
                <button onClick={() => handleEditSave(mat._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{mat.title}</strong> - {mat.summary} <br />
                <a href={mat.link} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
                <br />
                <button
                  onClick={() => {
                    setEditingId(mat._id)
                    setEditData({ title: mat.title, summary: mat.summary, link: mat.link })
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(mat._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminInformationMaterials
