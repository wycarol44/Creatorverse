import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { supabase } from './client'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'

function App() {
  const [creators, setCreators] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/') {
      return
    }

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
  }, [location.pathname])

  const deleteCreator = async (creatorId) => {
    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', creatorId)
      .select('id')

    if (error) {
      console.error('Error deleting creator:', error.message)
      return
    }

    if (!data?.length) {
      console.warn('No creator was deleted. Check the creator id or Supabase row policies.')
      return
    }

    setCreators((currentCreators) =>
      currentCreators.filter((creator) => String(creator.id) !== String(creatorId)),
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
