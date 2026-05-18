import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import { CreatorForm } from './AddCreator'

const emptyCreator = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [formData, setFormData] = useState(emptyCreator)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error.message)
        setIsLoading(false)
        return
      }

      setCreator(data)
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || '',
      })
      setIsLoading(false)
    }

    getCreator()
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const updateCreator = async (event) => {
    event.preventDefault()

    const { error } = await supabase
      .from('creators')
      .update({
        name: formData.name,
        url: formData.url,
        description: formData.description,
        imageURL: formData.imageURL || null,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error.message)
      return
    }

    navigate('/')
  }

  const deleteCreator = async () => {
    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)
      .select('id')

    if (error) {
      console.error('Error deleting creator:', error.message)
      return
    }

    if (!data?.length) {
      console.warn('No creator was deleted. Check the creator id or Supabase row policies.')
      return
    }

    navigate('/')
  }

  if (isLoading) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Loading creator...</h1>
        </section>
      </main>
    )
  }

  if (!creator) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Creator not found</h1>
          <Link className="button-link" to="/">
            Back to creators
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page form-page">
      <Link className="text-button button-link" to="/">
        Back to all creators
      </Link>
      <section>
        <h1>Edit {creator.name}</h1>
        <CreatorForm
          formData={formData}
          submitLabel="Save changes"
          onChange={handleInputChange}
          onSubmit={updateCreator}
        />
        <button className="danger form-delete" type="button" onClick={deleteCreator}>
          Delete creator
        </button>
      </section>
    </main>
  )
}

export default EditCreator
