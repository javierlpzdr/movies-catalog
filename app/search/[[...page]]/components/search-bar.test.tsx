import { screen, render, fireEvent } from "@testing-library/react";
import SearchBar from "./search-bar";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useParams() {
    return { query: "" };
  },
  useRouter() {
    return {
      pathname: "",
      push: mockPush,
    };
  },
}));

describe("SearchBar", () => {
  it("shows the search bar", () => {
    render(<SearchBar />);

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockPush).toBeCalledWith("/search?query=");
  });

  it("allows to search by the term example", async () => {
    render(<SearchBar />);

    const searchBar = screen.getByRole("search");
    const searchButton = screen.getByText("Search");

    await userEvent.type(searchBar, "example");
    fireEvent.click(searchButton);

    expect(mockPush).toBeCalledWith("/search?query=example");
  });
});
