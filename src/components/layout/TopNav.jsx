import React from 'react'
import { Link } from 'react-router-dom'

const TopNav = ({ user, onLogout }) => (
  <nav className="top-nav">
    <div className="logo">
      <Link to="/">Home</Link>
    </div>
    <div className="nav-links">
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button type="button" onClick={onLogout}>Logout</button>
      )}
    </div>
  </nav>
)

export default TopNav