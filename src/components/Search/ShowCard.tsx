import Heart from "../Favorites/Heart"
import { useFavorites } from "../../context/FavoritesContext"

export interface ShowCard {
  show: ShowDetails
}

function ShowCard({ show }: ShowCard) {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  const handleFavorite = (show: ShowDetails) => {
    if (isFavorite(show.id)) {
      removeFavorite(show.id)
    } else {
      addFavorite(show)
    }
  }

  return (
    <div className="card-show-outer position-relative">
      <Heart
        height="20"
        width="20"
        onClick={() => handleFavorite(show)}
        isFavorite={isFavorite(show.id)}
      />
      <a href={`/show/${show.id}`}>
        <div className="card-show d-flex flex-column">
          <div className="pb-3">
            <div>
              <b>Rating:</b> {show.rating.average}
            </div>
            <div>
              <b>Name:</b> {show.name}
            </div>
            <div>
              <b>Type:</b> {show.type}
            </div>
            <div>
              <b>Genres: </b>
              {show.genres.map((genre) => genre).join(" | ")}
            </div>
            <div>
              <b>Status:</b> {show.status}
            </div>
          </div>
          {show.image && <img src={show.image.medium}></img>}
        </div>
      </a>
    </div>
  )
}

export default ShowCard
