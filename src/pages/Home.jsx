import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user, onLogout }) => (
  <div className="app-container">
    <h1 className="home-title">MiSOS</h1>
    <h2 className="home-subtitle">Safety and Support, Wherever You are in Bahrain</h2>
    <Link to="/sos" className="sos-btn">SOS</Link>

    <div className="home-actions">
      {!user ? (
        <div className="auth-links">
    <h3 className="home-welcome">Click SOS for help or enquiries.</h3>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>

        </div>
        

      ) : (
        <div>
      <h3 className="home-welcome">Click SOS for help or enquiries.</h3>
          <nav>
            <ul className="home-nav">
              <li><Link to="/information">Know Your Rights</Link></li>
              <li><Link to="/resources">Support Channels</Link></li>
              {user.isAdmin ? (
                <li><Link to="/admin">Admin Dashboard</Link></li>
              ) : null}
            </ul>
          </nav>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  </div>
)

export default Home