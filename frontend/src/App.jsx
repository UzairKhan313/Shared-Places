import { Routes, Route } from 'react-router-dom'

// Importing All Pages.
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UpdatePlace from './places/pages/UpdatePlace'

function App() {
  return (
    <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
      </Routes>
    </main>
  )
}

export default App
