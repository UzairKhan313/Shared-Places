import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    // { id: 1, name: 'Uzair khan', image: 'wwww.image.com', placec: 3 },
  ]
  return <UsersList users={USERS} />
}

export default Users
