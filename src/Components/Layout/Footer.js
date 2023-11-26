import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className="footer bg-dark text-light p-3">
      <h3 className="text-center bg-dark">All Right Reserved &copy; Techinfoyt</h3>
      <p className="text-center bg-dark mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer