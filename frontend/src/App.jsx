import { Routes, Route } from 'react-router-dom'

// Importing All Pages.
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'

function App() {
  return (
    <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
      </Routes>
    </main>
  )
}

export default App
