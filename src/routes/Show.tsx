import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import parse from "html-react-parser"
import Message from "../components/Message"
import ShowInfo from "../components/Show/ShowInfo"
import Heart from "../components/Favorites/Heart"
import FavoritesNavigation from "../components/Favorites/FavoritesNavigation"
import { useFavorites } from "../context/FavoritesContext"

function Show() {
  const { showId } = useParams()

  const [tvShow, setTvShow] = useState<ShowDetails>()
  const [error, setError] = useState<string | null>(null)

  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    getShow(showId)
  }, [showId])

  async function getShow(id: string | undefined) {
    if (!id) {
      setError("An unexpected error occurred")
    }
    try {
      const cachedShow = localStorage.getItem(`show-${id}`)
      if (cachedShow) {
        setTvShow(JSON.parse(cachedShow))
      } else {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
        if (!response.ok) {
          throw new Error("Network request failed")
        }
        const data: ShowDetails = await response.json()
        localStorage.setItem(`show-${id}`, JSON.stringify(data))
        setTvShow(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    }
  }

  const handleFavorite = (show: ShowDetails) => {
    if (isFavorite(show.id)) {
      removeFavorite(show.id)
    } else {
      addFavorite(show)
    }
  }

  return (
    <div className="show-page">
      <nav>
        <a href="/" className="me-4">
          Back to search
        </a>
        <FavoritesNavigation />
      </nav>
      {error ? (
        <Message cls="error" text={error} />
      ) : (
        <>
          {tvShow && (
            <>
              <h1>{tvShow?.name}</h1>
              <div className="show-outer">
                <div className="d-flex justify-content-between show-col">
                  <div className="d-flex show-row">
                    {tvShow?.image && <img src={tvShow?.image.medium}></img>}
                    <ShowInfo show={tvShow} />
                  </div>
                  <Heart
                    height="20"
                    width="20"
                    onClick={() => handleFavorite(tvShow)}
                    isFavorite={isFavorite(tvShow.id)}
                  />
                </div>
                <div className="mt-4">
                  {tvShow?.summary && parse(tvShow?.summary!)}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Show
