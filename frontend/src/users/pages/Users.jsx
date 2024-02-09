import React from 'react'

import UsersList from '../components/UsersList'
import userImage from '../../assets/img.jpg'

const Users = () => {
  const USERS = [{ id: 'u1', name: 'Uzair khan', image: userImage, places: 3 }]
  return <UsersList users={USERS} />
}

export default Users
