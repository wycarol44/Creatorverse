import { useState } from 'react'
import { Navigate, useNavigate, useParams, useRoutes } from 'react-router-dom'
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

const initialCreators = [
  {
    id: 1,
    name: 'Marques Brownlee',
    url: 'https://www.youtube.com/@mkbhd',
    description:
      'Crisp, deeply researched videos about consumer tech, gadgets, and the future of personal devices.',
    imageURL:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Simone Giertz',
    url: 'https://www.youtube.com/@simonegiertz',
    description:
      'Inventive builds, playful engineering projects, and thoughtful product experiments.',
    imageURL:
      'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Kurzgesagt',
    url: 'https://www.youtube.com/@kurzgesagt',
    description:
      'Animated science explainers that make complex ideas clear, beautiful, and memorable.',
    imageURL:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80',
  },
]

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

function ViewCreatorRoute({ creators, onDelete }) {
  const { id } = useParams()
  const creator = creators.find((currentCreator) => currentCreator.id === Number(id))

  return <ViewCreator creator={creator} onDelete={onDelete} />
}

function EditCreatorRoute({
  creators,
  onUpdateCreator,
}) {
  const { id } = useParams()
  const creator = creators.find((currentCreator) => currentCreator.id === Number(id))
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
  const [creators, setCreators] = useState(initialCreators)
  const navigate = useNavigate()

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
        creator.id === Number(creatorId) ? { ...creator, ...creatorData } : creator,
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
      element: <ViewCreatorRoute creators={creators} onDelete={deleteCreator} />,
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
