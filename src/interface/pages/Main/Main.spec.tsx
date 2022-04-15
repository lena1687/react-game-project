import {
  screen,
  render,
  getNodeText,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Main } from "./Main";

describe("Main", () => {
  describe("render", () => {
    it("GeneralInfo", () => {
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
      screen.debug();
    });

    it("Button", () => {
      const { container, getByRole } = render(<Main />);
      getByRole("button", { name: "Continue" });
      expect(container.getElementsByClassName("options").length).toBe(0);
      screen.debug();
    });
  });
  describe("actions", () => {
    it("Choose difficulty level from select", async () => {
      const { container, getByText } = render(<Main />);
      await waitFor(() => {
        fireEvent.click(getByText("Continue"));
      });
      expect(container.querySelector(".options")).toBeVisible();
      expect(getByText("Difficulty level")).toBeInTheDocument();
      expect(
        getNodeText(container.querySelector(".field") as HTMLElement)
      ).toEqual("Choose the difficulty level");
      expect(container.getElementsByClassName("panel").length).toBe(0);
      await waitFor(() => {
        fireEvent.click(getByText("Choose the difficulty level"));
      });
      expect(container.querySelector(".panel")).toBeVisible();
      const items = container.getElementsByClassName("panelItem");
      expect(items).toHaveLength(9);
      await waitFor(() => {
        fireEvent.click(getByText("6"));
      });
      expect(container.getElementsByClassName("panel").length).toBe(0);
      screen.debug();
    });
  });
});
