import MOCK_DATA_THEMES from "../../../../../../public/data/ThemesMemoryCards.json";
import {
  act,
  fireEvent,
  getNodeText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Options } from "./Options";
import { Formik } from "formik";
import React from "react";
import { Main } from "../../Main";

describe("Options", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("options after click 'Continue'", async () => {
    const { container, getByText, queryByTestId } = render(<Main />);
    fireEvent.click(getByText("Continue"));
    await waitFor(() => {
      expect(queryByTestId("button-continue")).not.toBeInTheDocument();
    });
    expect(container.querySelector(".options")).toBeVisible();
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA_THEMES),
    })
  ) as jest.Mock;

  it("render without errors", async () => {
    const { container } = render(<Options />);
    await waitFor(() => {
      expect(container.querySelector(".radioGroup")).toBeVisible();
    });
  });

  it("filling out the form", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Formik
        initialValues={{ userName: "", complexity: null, theme: null }}
        onSubmit={onSubmit}
      >
        {() => <Options />}
      </Formik>
    );

    //select "UserName"
    await waitFor(() => {
      expect(getByText("UserName")).toBeInTheDocument();
    });
    const input = container.querySelector(
      "input[name='userName']"
    ) as HTMLElement;
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value: "result" } });
    await waitFor(() => {
      expect(input?.getAttribute("value")).toEqual("Result");
    });

    //select "Difficulty level"
    await waitFor(() => {
      expect(getByText("Difficulty level")).toBeInTheDocument();
    });
    expect(
      getNodeText(container.querySelector(".field") as HTMLElement)
    ).toEqual("Choose the difficulty level");
    expect(container.getElementsByClassName("panel").length).toBe(0);
    act(() => {
      fireEvent.click(container.querySelector(".fieldWrap") as Element);
    });
    await waitFor(() => {
      expect(container.querySelector(".panel")).toBeVisible();
    });
    const items = container.getElementsByClassName("panelItem");
    expect(items).toHaveLength(9);
    act(() => {
      fireEvent.click(getByText("6"));
    });
    await waitFor(() => {
      expect(container.getElementsByClassName("panel").length).toBe(0);
    });

    //RadioGroup "Choose the theme of cards"
    expect(getByText("Choose the theme of cards")).toBeInTheDocument();
    const radioAnimalTheme = container.querySelector(
      'input[value="animalTheme"]'
    ) as HTMLElement;
    const radioSuperHeroesTheme = container.querySelector(
      'input[value="superHeroesTheme"]'
    ) as HTMLElement;
    await waitFor(() => {
      expect(radioAnimalTheme).not.toBeChecked();
    });
    expect(radioSuperHeroesTheme).not.toBeChecked();
    act(() => {
      radioAnimalTheme.focus();
    });
    await waitFor(() => {
      expect(radioAnimalTheme).toHaveFocus();
    });
    act(() => {
      radioAnimalTheme.click();
    });
    await waitFor(() => {
      expect(radioAnimalTheme).toBeChecked();
    });
    expect(radioSuperHeroesTheme).not.toBeChecked();
    act(() => {
      radioSuperHeroesTheme.focus();
    });
    await waitFor(() => {
      expect(radioSuperHeroesTheme).toHaveFocus();
    });
    act(() => {
      radioSuperHeroesTheme.click();
    });
    await waitFor(() => {
      expect(radioAnimalTheme).not.toBeChecked();
    });
    expect(radioSuperHeroesTheme).toBeChecked();
    //screen.debug();

    //Click "Let's go"
    await waitFor(() => {
      expect(getByText("Let's go")).toBeInTheDocument();
    });
    fireEvent.click(getByText("Let's go"));
    const error = container.querySelector(".errorLabelBottom") as HTMLElement;
    await waitFor(() => {
      expect(error).not.toBeInTheDocument();
    });
    screen.debug();
  });
});
