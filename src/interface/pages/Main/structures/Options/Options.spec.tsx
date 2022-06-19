import MOCK_DATA_THEMES from "Assets/data/themesMemoryCards.json";
import {
  fireEvent,
  getNodeText,
  render,
  waitFor,
} from "@testing-library/react";
import { Options } from "./Options";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Options", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA_THEMES),
    })
  ) as jest.Mock;

  it("render without errors", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Options />
      </Router>
    );
    const error = container.querySelector(".errorLabelBottom") as HTMLElement;
    expect(error).not.toBeInTheDocument();
  });

  it("filling out the form", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Router location={history.location} navigator={history}>
        <Options onSubmitValues={onSubmit} />
      </Router>
    );

    //select "UserName"
    expect(getByText("UserName")).toBeInTheDocument();
    const input = container.querySelector(
      "input[name='userName']"
    ) as HTMLElement;
    input.focus();
    fireEvent.change(input, { target: { value: "result" } });
    expect(input?.getAttribute("value")).toEqual("Result");

    //select "Difficulty level"
    expect(getByText("Difficulty level")).toBeInTheDocument();
    expect(
      getNodeText(container.querySelector(".field") as HTMLElement)
    ).toEqual("Choose the difficulty level");
    expect(container.getElementsByClassName("panel").length).toBe(0);
    fireEvent.click(container.querySelector(".fieldWrap") as Element);
    await waitFor(() => {
      expect(container.querySelector(".panel")).toBeVisible();
    });
    const items = container.getElementsByClassName("panelItem");
    expect(items).toHaveLength(9);
    fireEvent.click(getByText("6"));
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
    expect(radioAnimalTheme).not.toBeChecked();
    expect(radioSuperHeroesTheme).not.toBeChecked();
    radioAnimalTheme.focus();
    expect(radioAnimalTheme).toHaveFocus();
    radioAnimalTheme.click();
    expect(radioAnimalTheme).toBeChecked();
    expect(radioSuperHeroesTheme).not.toBeChecked();
    radioSuperHeroesTheme.focus();
    expect(radioSuperHeroesTheme).toHaveFocus();
    radioSuperHeroesTheme.click();
    expect(radioAnimalTheme).not.toBeChecked();
    expect(radioSuperHeroesTheme).toBeChecked();

    //"Reset form"
    expect(getByText("Reset form")).toBeInTheDocument();

    //Click "Let's go"
    expect(getByText("Let's go")).toBeInTheDocument();
    const error = container.querySelector(".errorLabelBottom") as HTMLElement;
    expect(error).not.toBeInTheDocument();
    fireEvent.click(getByText("Let's go"));
    await waitFor(() => {
      expect(onSubmit).toBeCalledTimes(1);
    });
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        userName: "Result",
        complexity: "6",
        theme: "superHeroesTheme",
      })
    );
    expect(history.location.pathname).toBe("/memory-cards");
    expect(history.location.search).toBe(
      "?userName=Result&complexity=6&theme=superHeroesTheme"
    );
  });

  it("reset form", async () => {
    const onSubmit = jest.fn();
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router location={history.location} navigator={history}>
        <Options
          initialValues={{
            userName: "Result",
            complexity: "6",
            theme: "animalTheme",
          }}
          onSubmitValues={onSubmit}
        />
      </Router>
    );

    //Click "Reset form"
    expect(getByText("Reset form")).toBeInTheDocument();
    fireEvent.click(getByText("Reset form"));
    await waitFor(() => {
      expect(
        container.querySelector("input[name='userName']")?.getAttribute("value")
      ).toEqual("");
    });
    expect(
      getNodeText(container.querySelector(".field") as HTMLElement)
    ).toEqual("Choose the difficulty level");
    expect(
      container.querySelector('input[value="animalTheme"]')
    ).not.toBeChecked();
    expect(
      container.querySelector('input[value="superHeroesTheme"]')
    ).not.toBeChecked();

    //Click "Let's go"
    expect(getByText("Let's go")).toBeInTheDocument();
    fireEvent.click(getByText("Let's go"));
    await waitFor(() => {
      expect(container.querySelector(".errorLabelBottom")).toBeVisible();
    });
  });
});
