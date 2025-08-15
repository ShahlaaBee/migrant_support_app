import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'

const Register = ({ onRegister }) => {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false) 
  const handleRegister = async (formData) => {
    try {
      const res = await fetch('https://misos.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
      })

      if (!res.ok) {
        let errorMsg = 'Registration failed'
        try {
          const errorData = await res.json()
          errorMsg = errorData.msg || JSON.stringify(errorData)
        } catch {
          // Do not attempt res.text() here!
        }
        throw new Error(errorMsg)
      }
      const data = await res.json()
      localStorage.setItem('token', data.token)
      onRegister(data.user)
      setSuccess(true) 
      setTimeout(() => {
        navigate('/') 
      }, 2000)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <h2>Register</h2>
      {success ? (
        <div>
          You have been successfully registered! Redirecting to home.
        </div>
      ) : (
        <AuthForm mode="register" onSubmit={handleRegister} />
      )}
    </>
  )
}

export default Register