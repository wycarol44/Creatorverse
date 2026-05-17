import { useState } from 'react'
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

function App() {
  const [creators, setCreators] = useState(initialCreators)
  const [page, setPage] = useState('show')
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [formData, setFormData] = useState(emptyCreator)

  const showCreators = () => {
    setSelectedCreator(null)
    setFormData(emptyCreator)
    setPage('show')
  }

  const viewCreator = (creator) => {
    setSelectedCreator(creator)
    setPage('view')
  }

  const startAddCreator = () => {
    setSelectedCreator(null)
    setFormData(emptyCreator)
    setPage('add')
  }

  const startEditCreator = (creator) => {
    setSelectedCreator(creator)
    setFormData({
      name: creator.name,
      url: creator.url,
      description: creator.description,
      imageURL: creator.imageURL || '',
    })
    setPage('edit')
  }

  const deleteCreator = (creatorId) => {
    setCreators((currentCreators) =>
      currentCreators.filter((creator) => creator.id !== creatorId),
    )
    showCreators()
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const addCreator = (event) => {
    event.preventDefault()
    setCreators((currentCreators) => [
      ...currentCreators,
      {
        id: Date.now(),
        ...formData,
      },
    ])
    showCreators()
  }

  const updateCreator = (event) => {
    event.preventDefault()
    setCreators((currentCreators) =>
      currentCreators.map((creator) =>
        creator.id === selectedCreator.id ? { ...creator, ...formData } : creator,
      ),
    )
    showCreators()
  }

  if (page === 'add') {
    return (
      <AddCreator
        formData={formData}
        onChange={handleInputChange}
        onSubmit={addCreator}
        onCancel={showCreators}
      />
    )
  }

  if (page === 'edit') {
    return (
      <EditCreator
        creator={selectedCreator}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={updateCreator}
        onCancel={showCreators}
      />
    )
  }

  if (page === 'view') {
    return (
      <ViewCreator
        creator={selectedCreator}
        onBack={showCreators}
        onEdit={startEditCreator}
        onDelete={deleteCreator}
      />
    )
  }

  return (
    <ShowCreators
      creators={creators}
      onAdd={startAddCreator}
      onView={viewCreator}
      onEdit={startEditCreator}
      onDelete={deleteCreator}
    />
  )
}

export default App
