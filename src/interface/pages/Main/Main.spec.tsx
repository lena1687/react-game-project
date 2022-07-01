import { render, getNodeText, fireEvent } from "@testing-library/react";
import { Main } from "Pages/Main";
import { unmountComponentAtNode } from "react-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import React from "react";
import MOCK_DATA_THEMES from "Assets/data/themesMemoryCards.json";

let container: any = null;
beforeEach(() => {
  // preparing DOM-element, where we'll render
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // clear after completion
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Main", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA_THEMES),
    })
  ) as jest.Mock;

  it("generalInfo", () => {
    const { container, getByText } = render(<Main />);
    //different methods of getting text
    expect(getByText("Hi, my friends")).toBeInTheDocument();
    expect(
      getNodeText(container.querySelector(".description") as HTMLElement)
    ).toContain(
      'Happy to see you in the game "Memory Cards".Purpose of the game: open all the cards by finding the pairs.'
    );
  });

  it("button 'Continue'", () => {
    const { container, getByRole } = render(<Main />);
    getByRole("button", { name: "Continue" });
    expect(container.getElementsByClassName("overlayForm").length).toBe(0);
  });

  it("options after click 'Continue'", async () => {
    const history = createMemoryHistory();
    const { container, getByText, queryByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Main />
      </Router>
    );
    fireEvent.click(getByText("Continue"));
    expect(queryByTestId("button-continue")).not.toBeInTheDocument();
    expect(container.querySelector(".overlayForm")).toBeVisible();
  });
});
