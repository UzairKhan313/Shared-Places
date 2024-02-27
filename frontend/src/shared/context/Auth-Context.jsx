import { createContext, useCallback, useContext, useState } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  logout: () => {},
  login: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  const loginHandler = useCallback((userId, token, expirationDate) => {
    setToken(token)
    setUserId(userId)
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // current date + 1 hr
    setTokenExpirationDate(tokenExpirationTime)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpirationTime.toISOString(),
      })
    )
  }, [])
  const logoutHandler = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  const value = {
    isLoggedIn: !!token, // converting value into true and null or undefine to false.
    token: token,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
    tokenExpirationDate,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
