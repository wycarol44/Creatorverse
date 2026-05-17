import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams, useRoutes } from 'react-router-dom'
import { supabase } from './client'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'

const emptyCreator = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

function AddCreatorRoute({ onAddCreator }) {
  const [formData, setFormData] = useState(emptyCreator)
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddCreator(formData)
    navigate('/')
  }

  return (
    <AddCreator
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

function EditCreatorRoute({
  creators,
  onUpdateCreator,
}) {
  const { id } = useParams()
  const creator = creators.find((currentCreator) => String(currentCreator.id) === id)
  const [formData, setFormData] = useState({
    name: creator?.name || '',
    url: creator?.url || '',
    description: creator?.description || '',
    imageURL: creator?.imageURL || '',
  })
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onUpdateCreator(id, formData)
    navigate('/')
  }

  return (
    <EditCreator
      creator={creator}
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

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

  const addCreator = (creatorData) => {
    setCreators((currentCreators) => [
      ...currentCreators,
      {
        id: Date.now(),
        ...creatorData,
      },
    ])
  }

  const updateCreator = (creatorId, creatorData) => {
    setCreators((currentCreators) =>
      currentCreators.map((creator) =>
        String(creator.id) === String(creatorId)
          ? { ...creator, ...creatorData }
          : creator,
      ),
    )
  }

  const element = useRoutes([
    {
      path: '/',
      element: <ShowCreators creators={creators} onDelete={deleteCreator} />,
    },
    {
      path: '/new',
      element: <AddCreatorRoute onAddCreator={addCreator} />,
    },
    {
      path: '/view/:id',
      element: <ViewCreator onDelete={deleteCreator} />,
    },
    {
      path: '/edit/:id',
      element: (
        <EditCreatorRoute
          creators={creators}
          onUpdateCreator={updateCreator}
        />
      ),
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])

  return <div className="app-container">{element}</div>
}

export default App
