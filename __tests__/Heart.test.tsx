import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Heart from "../src/components/Favorites/Heart"

describe("Heart component", () => {
  test("changes style on hover", () => {
    render(<Heart />)
    const svgElement = screen.getByTestId("heart-icon")
    fireEvent.mouseEnter(svgElement)
    expect(svgElement).toHaveClass("filled")
    fireEvent.mouseLeave(svgElement)
    expect(svgElement).not.toHaveClass("filled")
  })

  test("handles onClick event", () => {
    const handleClick = jest.fn()
    render(<Heart onClick={handleClick} />)
    const svgElement = screen.getByTestId("heart-icon")
    fireEvent.click(svgElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
