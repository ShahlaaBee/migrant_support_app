import React from 'react'
import AuthForm from '../components/auth/AuthForm'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()

  const handleLogin = async (formData) => {
    try {
      const res = await fetch('https://misos.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      })

      if (!res.ok) {
        let errorMsg = 'Login failed'
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
      onLogin && onLogin(data.user)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <AuthForm mode="login" onSubmit={handleLogin} />
    </>
  )
}

export default Login