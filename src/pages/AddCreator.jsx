import { Link } from 'react-router-dom'

function AddCreator({ formData, onChange, onSubmit }) {
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
          onChange={onChange}
          onSubmit={onSubmit}
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
