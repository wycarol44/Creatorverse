function Card({ creator, onView, onEdit, onDelete }) {
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
          <p>{creator.description}</p>
        </div>

        <div className="creator-card__actions" aria-label={`${creator.name} actions`}>
          <a href={creator.url} target="_blank" rel="noreferrer">
            Visit
          </a>
          <button type="button" onClick={() => onView(creator)}>
            View
          </button>
          <button type="button" onClick={() => onEdit(creator)}>
            Edit
          </button>
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
