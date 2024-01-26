import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import FavoritesNavigation from "../src/components/Favorites/FavoritesNavigation"

test("renders a link to the favorites page", () => {
  render(<FavoritesNavigation />)
  const linkElement = screen.getByRole("link", { name: "My favorites" })
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).toHaveAttribute("href", "/favorites")
})
