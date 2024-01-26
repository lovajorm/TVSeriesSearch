import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../src/components/Search/SearchForm";

describe("SearchForm component", () => {
  test("calls onInputChange when user types in the input", () => {
    const handleInputChange = jest.fn();
    render(<SearchForm onInputChange={handleInputChange} />);

    const input = screen.getByPlaceholderText("Search Shows");
    fireEvent.change(input, { target: { value: "Game of Thrones" } });
    expect(handleInputChange).toHaveBeenCalledWith(expect.anything());
    expect(handleInputChange.mock.calls[0][0].target.value).toBe(
      "Game of Thrones"
    );
  });
});
