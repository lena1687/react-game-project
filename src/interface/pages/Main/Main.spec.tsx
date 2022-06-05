import { render, getNodeText } from "@testing-library/react";
import { Main } from "./Main";
import { unmountComponentAtNode } from "react-dom";

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
  it("generalInfo", () => {
    const { container, getByTestId, getByText } = render(<Main />);
    //different methods of getting text
    expect(getByText("Hi, my friends")).toBeInTheDocument();
    expect(
      getNodeText(container.querySelector(".description") as HTMLElement)
    ).toEqual(
      'Happy to see you in the game "Memory Cards". Purpose of the game: open all the cards by finding the pairs.'
    );
    //for searching a part phrase
    const note = getByTestId("general-info-note");
    expect(note).toHaveTextContent("Before playing");
    // screen.debug();
  });

  it("button 'Continue'", () => {
    const { container, getByRole } = render(<Main />);
    getByRole("button", { name: "Continue" });
    expect(container.getElementsByClassName("options").length).toBe(0);
    // screen.debug();
  });
});
