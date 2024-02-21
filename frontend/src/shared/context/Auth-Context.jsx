import { createContext, useCallback, useContext, useState } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  logout: () => {},
  login: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLogin] = useState(false)
  const [userId, setUserId] = useState(null)

  const loginHandler = useCallback((userId) => {
    setIsLogin(true)
    setUserId(userId)
  })
  const logoutHandler = useCallback(() => {
    setIsLogin(false)
    setUserId(null)
  }, [])

  const value = {
    isLoggedIn: isLoggedIn,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
