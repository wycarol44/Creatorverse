import Card from '../components/Card'

function ShowCreators({ creators, onAdd, onView, onEdit, onDelete }) {
  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Creatorverse</p>
          <h1>Content creators worth following</h1>
        </div>
        <button type="button" onClick={onAdd}>
          Add creator
        </button>
      </header>

      {creators.length > 0 ? (
        <section className="creator-grid" aria-label="Content creators">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              creator={creator}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No creators yet</h2>
          <p>Add your first favorite creator to start building the universe.</p>
          <button type="button" onClick={onAdd}>
            Add creator
          </button>
        </section>
      )}
    </main>
  )
}

export default ShowCreators
