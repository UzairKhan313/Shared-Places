import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/Http-Hook'

const Users = () => {
  const [loadedUser, setLoadedUser] = useState()
  const { error, isLoading, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/v1/users',
          'GET'
        )

        setLoadedUser(responseData.users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllUser()
  }, [sendRequest])
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && <UsersList users={loadedUser} />}
    </>
  )
}

export default Users
