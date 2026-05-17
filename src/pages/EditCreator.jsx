import { CreatorForm } from './AddCreator'

function EditCreator({ creator, formData, onChange, onSubmit, onCancel }) {
  if (!creator) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Creator not found</h1>
          <button type="button" onClick={onCancel}>
            Back to creators
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="page form-page">
      <button className="text-button" type="button" onClick={onCancel}>
        Back to all creators
      </button>
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
