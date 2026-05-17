import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import { supabase } from './client'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'

function App() {
  const [creators, setCreators] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching creators:', error.message)
        return
      }

      setCreators(data || [])
    }

    getCreators()
  }, [])

  const deleteCreator = (creatorId) => {
    setCreators((currentCreators) =>
      currentCreators.filter((creator) => creator.id !== creatorId),
    )
    navigate('/')
  }

  const element = useRoutes([
    {
      path: '/',
      element: <ShowCreators creators={creators} onDelete={deleteCreator} />,
    },
    {
      path: '/new',
      element: <AddCreator />,
    },
    {
      path: '/view/:id',
      element: <ViewCreator onDelete={deleteCreator} />,
    },
    {
      path: '/edit/:id',
      element: <EditCreator />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])

  return <div className="app-container">{element}</div>
}

export default App
