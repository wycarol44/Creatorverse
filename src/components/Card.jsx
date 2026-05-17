import { Link } from 'react-router-dom'

function Card({ creator, onDelete }) {
  const fallbackImage =
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80'

  return (
    <article className="creator-card">
      <img
        className="creator-card__image"
        src={creator.imageURL || fallbackImage}
        alt={creator.imageURL ? `${creator.name} preview` : ''}
      />
      <div className="creator-card__content">
        <div>
          <h2>{creator.name}</h2>
          <a
            className="creator-card__url"
            href={creator.url}
            target="_blank"
            rel="noreferrer"
          >
            {creator.url}
          </a>
          <p>{creator.description}</p>
        </div>

        <div className="creator-card__actions" aria-label={`${creator.name} actions`}>
          <a href={creator.url} target="_blank" rel="noreferrer">
            Visit
          </a>
          <Link to={`/view/${creator.id}`}>
            View
          </Link>
          <Link to={`/edit/${creator.id}`}>
            Edit
          </Link>
          <button
            className="danger"
            type="button"
            onClick={() => onDelete(creator.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
