import Message from "../components/Message"
import ShowCard from "../components/Search/ShowCard"
import { useFavorites } from "../context/FavoritesContext"

function Favorites() {
  const { favorites } = useFavorites()
  if (favorites.length === 0) {
    return <Message cls="info" text="You have no favorites yet!" />
  }
  return (
    <>
      <nav>
        <a href="/" className="me-4">
          Back to search
        </a>
      </nav>
      <div className="d-flex flex-wrap search-result-outer">
        {favorites.map((show, key) => {
          return <ShowCard key={key} show={show} />
        })}
      </div>
    </>
  )
}

export default Favorites
