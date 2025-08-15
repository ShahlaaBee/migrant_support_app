import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import KnowYourRights from './pages/InformationMaterials'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SOS from './pages/SOS'
import Resources from './pages/SupportResources'
import AdminDashboard from './pages/AdminDashboard'
import AdminResourceList from "./components/resources/AdminResourceList"
import AdminInformationMaterials from "./components/information/AdminInformationMaterials"
import UserManagement from './pages/UserManagement'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'
import NotFound from './pages/NotFound'
import Footer from './components/layout/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import TopNav from './components/layout/TopNav'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(profile => profile ? setUser(profile) : setUser(null))
        .catch(() => setUser(null))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="app-container">

      <TopNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="/sos" element={<SOS />} />
          <Route
            path="/information"
            element={
              <ProtectedRoute user={user}>
                <KnowYourRights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute user={user}>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/admin/resources" element={<AdminResourceList />} /> 
          <Route
           path="/admin/information-materials"
           element={
           <AdminRoute user={user}>
             <AdminInformationMaterials />
          </AdminRoute>
           }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute user={user}>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App