import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div>
    <h1>Page Not Found</h1>
    <p>The page you requested does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
)

export default NotFound