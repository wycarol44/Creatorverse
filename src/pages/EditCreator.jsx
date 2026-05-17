import { Link } from 'react-router-dom'
import { CreatorForm } from './AddCreator'

function EditCreator({ creator, formData, onChange, onSubmit }) {
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
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </section>
    </main>
  )
}

export default EditCreator
