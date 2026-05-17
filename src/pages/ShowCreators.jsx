import { Link } from 'react-router-dom'
import Card from '../components/Card'

function ShowCreators({ creators, onDelete }) {
  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Creatorverse</p>
          <h1>Content creators worth following</h1>
        </div>
        <Link className="button-link" to="/new">
          Add creator
        </Link>
      </header>

      {creators.length > 0 ? (
        <section className="creator-grid" aria-label="Content creators">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              creator={creator}
              onDelete={onDelete}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No creators yet</h2>
          <p>Add your first favorite creator to start building the universe.</p>
          <Link className="button-link" to="/new">
            Add creator
          </Link>
        </section>
      )}
    </main>
  )
}

export default ShowCreators
