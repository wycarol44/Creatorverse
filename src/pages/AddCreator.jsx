import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const emptyCreator = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

function AddCreator() {
  const [formData, setFormData] = useState(emptyCreator)
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const addCreator = async (event) => {
    event.preventDefault()

    const { error } = await supabase.from('creators').insert({
      name: formData.name,
      url: formData.url,
      description: formData.description,
      imageURL: formData.imageURL || null,
    })

    if (error) {
      console.error('Error adding creator:', error.message)
      return
    }

    navigate('/')
  }

  return (
    <main className="page form-page">
      <Link className="text-button button-link" to="/">
        Back to all creators
      </Link>
      <section>
        <h1>Add creator</h1>
        <CreatorForm
          formData={formData}
          submitLabel="Add creator"
          onChange={handleInputChange}
          onSubmit={addCreator}
        />
      </section>
    </main>
  )
}

function CreatorForm({ formData, submitLabel, onChange, onSubmit }) {
  return (
    <form className="creator-form" onSubmit={onSubmit}>
      <label>
        Name
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Creator name"
        />
      </label>
      <label>
        Channel URL
        <input
          required
          type="url"
          name="url"
          value={formData.url}
          onChange={onChange}
          placeholder="https://example.com"
        />
      </label>
      <label>
        Description
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="What do they create?"
          rows="5"
        />
      </label>
      <label>
        Image URL
        <input
          type="url"
          name="imageURL"
          value={formData.imageURL}
          onChange={onChange}
          placeholder="Optional image URL"
        />
      </label>
      <button type="submit">{submitLabel}</button>
    </form>
  )
}

export { CreatorForm }
export default AddCreator
