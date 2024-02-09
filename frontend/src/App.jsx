import { Routes, Route } from 'react-router-dom'

// Importing All Pages.
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'

function App() {
  return (
    <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="places/new" element={<NewPlace />} />
      </Routes>
    </main>
  )
}

export default App
