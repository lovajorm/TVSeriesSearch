import { render, screen, waitFor } from "@testing-library/react";
import Show from "../src/routes/Show";
import { useParams } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

fetchMock.enableMocks();

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("Show component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test("fetches and displays data for a show", async () => {
    (useParams as jest.Mock).mockReturnValue({ showId: "4901" });
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 4901,
        name: "Celblok H",
        type: "Scripted",
        language: "Dutch",
        genres: ["Drama", "Crime"],
        status: "Ended",
        premiered: "2014-03-03",
        ended: "2017-03-27",
        schedule: {
          time: "20:30",
          days: ["Monday"],
        },
        rating: {
          average: null,
        },
        network: {
          id: 139,
          name: "SBS 6",
        },
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/210/526138.jpg",
        },
        summary:
          "<p>Suzanne Kramer used to be a hairdresser, but was sentenced to prison after her failed attempt to kill her own husband. Soon she discovers that life in prison is just a matter of surviving and a battle for power.</p>",
      })
    );
    render(<Show />);
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.tvmaze.com/shows/4901"
      )
    );
    expect(await screen.findByText("Celblok H")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://static.tvmaze.com/uploads/images/medium_portrait/210/526138.jpg"
    );
  });

  test("displays an error message when fetch fails", async () => {
    (useParams as jest.Mock).mockReturnValue({ showId: "123" });
    fetchMock.mockReject(new Error("An unexpected error occurred"));
    render(<Show />);
    await waitFor(() => screen.getByText("An unexpected error occurred"));
    expect(
      screen.getByText("An unexpected error occurred")
    ).toBeInTheDocument();
  });
});
