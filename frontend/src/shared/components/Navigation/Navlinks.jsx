import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthContext } from '../../context/Auth-Context'
import './Navlinks.css'

const Navlinks = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All USERS</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">NEW PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  )
}

export default Navlinks
