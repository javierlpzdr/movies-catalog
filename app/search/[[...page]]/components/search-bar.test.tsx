import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
      // ... whatever else you you call on `router`
    };
  },
}));

// There is a problem with waitForElementToBeRemoved and this component
export const waitForLoaderToBeRemoved = async () => {
  try {
    await waitFor(() => {
      const loader = screen.queryByText("loading");
      expect(loader).not.toBeInTheDocument();
    });
  } catch (e: any) {
    if (e.message.includes("already removed")) {
      // sometimes the loader has already been removed when we try to check for it!
      return;
    }
    throw e;
  }
};

describe("SearchBar", () => {
  it("shows the search bar", async () => {
    render(<SearchBar />);

    await waitForLoaderToBeRemoved();

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockPush).toBeCalledWith("/search?query=");
  });

  it("allows to search by the term example", async () => {
    render(<SearchBar />);

    await waitForLoaderToBeRemoved();

    const searchBar = screen.getByRole("search");
    const searchButton = screen.getByText("Search");

    await userEvent.type(searchBar, "example");
    fireEvent.click(searchButton);

    expect(mockPush).toBeCalledWith("/search?query=example");
  });
});
