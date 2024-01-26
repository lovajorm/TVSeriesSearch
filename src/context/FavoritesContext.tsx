import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

interface FavoritesContextValue {
  favorites: ShowDetails[]
  addFavorite: (show: ShowDetails) => void
  removeFavorite: (showId: number) => void
  isFavorite: (showId: number) => boolean
}

const defaultContextValue: FavoritesContextValue = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
}

const FavoritesContext =
  createContext<FavoritesContextValue>(defaultContextValue)

export const useFavorites = () => useContext(FavoritesContext)

type FavoritesProviderProps = {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<ShowDetails[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addFavorite = (show: ShowDetails) => {
    const newFavorites = [...favorites, show]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const removeFavorite = (showId: number) => {
    const newFavorites = favorites.filter((show) => show.id !== showId)
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (showId: number) => {
    return favorites.some((show) => show.id === showId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
