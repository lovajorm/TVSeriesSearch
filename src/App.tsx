import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Show from "./routes/Show"
import { Container } from "reactstrap"
import Favorites from "./routes/Favorites"
import { FavoritesProvider } from "./context/FavoritesContext"

function App() {
  return (
    <Router>
      <Container>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:showId" element={<Show />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </FavoritesProvider>
      </Container>
    </Router>
  )
}

export default App
