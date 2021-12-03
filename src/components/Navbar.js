import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
    <NavLink to="/home">Home</NavLink>
        
          <NavLink  to="/register">registration</NavLink>
    
          <NavLink  to="/login">login</NavLink>
</nav>
    
    
  )
}

export default Navbar
