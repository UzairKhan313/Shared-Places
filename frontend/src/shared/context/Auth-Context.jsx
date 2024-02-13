import { createContext, useCallback, useContext, useState } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLogin] = useState(false)

  const loginHandler = useCallback(() => {
    setIsLogin(true)
  })
  const logoutHandler = useCallback(() => {
    setIsLogin(false)
  }, [])

  const value = {
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
