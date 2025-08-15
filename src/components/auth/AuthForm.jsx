import React, { useState } from 'react'

const AuthForm = ({ mode, onSubmit }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '' 
  })


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === 'register' && (
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  )
}

export default AuthForm
