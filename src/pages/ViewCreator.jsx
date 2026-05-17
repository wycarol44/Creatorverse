import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator({ onDelete }) {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error.message)
      }

      setCreator(data)
      setIsLoading(false)
    }

    getCreator()
  }, [id])

  if (isLoading) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Loading creator...</h1>
        </section>
      </main>
    )
  }

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
        <img
          className="creator-detail__image"
          src={creator.imageURL || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80'}
          alt={creator.imageURL ? `${creator.name} preview` : ''}
        />
        <div className="creator-detail__body">
          <h1>{creator.name}</h1>
          <a
            className="creator-detail__url"
            href={creator.url}
            target="_blank"
            rel="noreferrer"
          >
            {creator.url}
          </a>
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
