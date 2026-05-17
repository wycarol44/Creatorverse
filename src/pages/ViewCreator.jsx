function ViewCreator({ creator, onBack, onEdit, onDelete }) {
  if (!creator) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Creator not found</h1>
          <button type="button" onClick={onBack}>
            Back to creators
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="page detail-page">
      <button className="text-button" type="button" onClick={onBack}>
        Back to all creators
      </button>

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
            <button type="button" onClick={() => onEdit(creator)}>
              Edit creator
            </button>
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
