import { Link } from 'react-router-dom'

function ViewCreator({ creator, onDelete }) {
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
    <main className="page detail-page">
      <Link className="text-button button-link" to="/">
        Back to all creators
      </Link>

      <section className="creator-detail">
        {creator.imageURL && (
          <img
            className="creator-detail__image"
            src={creator.imageURL}
            alt={`${creator.name} preview`}
          />
        )}
        <div className="creator-detail__body">
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
          <div className="creator-detail__actions">
            <a href={creator.url} target="_blank" rel="noreferrer">
              Visit channel
            </a>
            <Link className="button-link" to={`/edit/${creator.id}`}>
              Edit creator
            </Link>
            <button
              className="danger"
              type="button"
              onClick={() => onDelete(creator.id)}
            >
              Delete creator
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ViewCreator
