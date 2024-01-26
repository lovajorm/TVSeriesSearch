import { act, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "../src/routes/Home"
import { BrowserRouter } from "react-router-dom"
import fetchMock from "jest-fetch-mock"
import userEvent from "@testing-library/user-event"

fetchMock.enableMocks()

beforeEach(() => {
  fetchMock.resetMocks()
})

describe("Home component", () => {
  test("renders Home component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    expect(screen.getByText(/Search TV Shows/i)).toBeInTheDocument()
  })

  test("displays error message when a network request fails", async () => {
    fetchMock.mockReject(new Error("Network request failed"))
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    act(() => {
      userEvent.type(screen.getByPlaceholderText("Search Shows"), "test")
      waitFor(() => {
        const errorMessage = screen.getByText("Network request failed")
        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveClass("error")
      })
    })
  })

  test("displays info message when no matching results are found", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]))
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    userEvent.type(screen.getByPlaceholderText("Search Shows"), "test")
    const infoMessage = await screen.findByText(
      "No matching results were found"
    )
    expect(infoMessage).toBeInTheDocument()
    expect(infoMessage).toHaveClass("info")
  })
})
