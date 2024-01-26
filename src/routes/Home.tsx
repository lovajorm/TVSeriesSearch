import { useEffect, useState } from "react"
import SearchForm from "../components/Search/SearchForm"
import { useSearchParams } from "react-router-dom"
import Message from "../components/Message"
import FavoritesNavigation from "../components/Favorites/FavoritesNavigation"
import ShowCard from "../components/Search/ShowCard"

function Home() {
  const [tvShows, setTvShows] = useState<TVShow[]>([])
  const [error, setError] = useState<string | null>(null)

  const [searchValue, setSearchValue] = useState("")
  const [_, setSearchParams] = useSearchParams({})

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchTVShows(searchValue)
    }, 500) // 500 ms debounce-time

    return () => clearTimeout(timeoutId)
  }, [searchValue])

  async function searchTVShows(query: string) {
    setSearchParams({ q: query })
    try {
      const cachedResults = localStorage.getItem(`search-${query}`)
      if (cachedResults) {
        setTvShows(JSON.parse(cachedResults))
      } else {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`
        )
        if (!response.ok) {
          throw new Error("Network request failed")
        }
        const data: TVShow[] = await response.json()
        localStorage.setItem(`search-${query}`, JSON.stringify(data))
        setTvShows(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <h1 className="mb-5">Search TV Shows</h1>
      <nav className="mb-2 d-flex flex-row-reverse">
        <FavoritesNavigation />
      </nav>
      <SearchForm onInputChange={handleInputChange} />
      {error ? (
        <Message cls="error" text={error} />
      ) : tvShows.length === 0 ? (
        <Message cls="info" text="No matching results were found" />
      ) : (
        <div className="d-flex flex-wrap search-result-outer">
          {tvShows.map((show, key) => {
            return <ShowCard key={key} show={show.show} />
          })}
        </div>
      )}
    </>
  )
}

export default Home
