import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importing All Pages.
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import RouteErrorPage from './shared/pages/RouteErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Users />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: 'new/place',
    element: <NewPlace />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
