import { createMemoryHistory } from "history";
import { screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Content } from "Structures/Content";
import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";
import MOCK_DATA_THEMES from "Assets/data/themesMemoryCards.json";
import MemoryCardsSlice, {
  fetchDataMemoryCards,
  initialState,
} from "Slices/MemoryCardsSlice";
import { setupStore } from "../../../redux/store";
import { MemoryCards } from "Pages/MemoryCards/MemoryCards";

describe("MemoryCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA_THEMES),
    })
  ) as jest.Mock;

  it("should return the initial state", () => {
    expect(MemoryCardsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("Should initially set games to an empty object", () => {
    const state = setupStore().getState().MemoryCards;
    expect(state).toEqual(initialState);
  });

  it("Should be able to fetch the games list", async () => {
    const result = await setupStore().dispatch(fetchDataMemoryCards());
    const data = result.payload;
    expect(result.type).toBe("memoryCards/getData/fulfilled");
    expect(data).toEqual(MOCK_DATA_THEMES);
    //subscribe - for update
    setupStore().subscribe(() => {
      const state = setupStore().getState().MemoryCards;
      console.log("-> state", state);
      expect(state).toEqual({ MOCK_DATA_THEMES, error: false, loading: false });
    });
  });

  it("error loading  game-page", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=anima");
    const { container } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <MemoryCards />
      </Router>
    );
    await waitFor(() => {
      expect(container.getElementsByClassName("errorMessage").length).toBe(1);
    });
    expect(container.getElementsByClassName("cardsWrap").length).toBe(0);
  });

  it("initial success loading game-page", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    const { container } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    await waitFor(() => {
      expect(container.getElementsByClassName("errorMessage").length).toBe(0);
    });
    expect(container.getElementsByClassName("cardsWrap").length).toBe(1);
    expect(screen.getByText("So, Andy")).toBeInTheDocument();
    const cardItem = container.getElementsByClassName("cardItem");
    expect(cardItem).toHaveLength(8);
  });

  it("success loading game-page without progress", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    const { container } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(window.localStorage.progress).toBe(undefined);
    const images = container.querySelectorAll(".cardItem");
    const progress = window.localStorage.progress
      ? JSON.parse(window.localStorage.progress)
      : [];
    images.forEach((card, index) => {
      const pattern = progress[index] ? /^animal-([1-8]).jpg/ : /cardBack/;
      expect(card.getAttribute("alt")).toMatch(pattern);
    });
  });

  it("success loading game-page with progress", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    window.localStorage.setItem(
      "setOfImages",
      '[{"value":"animalTheme","images":["animal-1.jpg","animal-2.jpg","animal-3.jpg","animal-4.jpg","animal-5.jpg","animal-6.jpg","animal-7.jpg","animal-8.jpg"]},{"value":"superHeroesTheme","images":["hero-1.jpg","hero-2.jpg","hero-3.jpg","hero-4.jpg","hero-5.jpg","hero-6.jpg","hero-7.jpg","hero-8.jpg"]}]'
    );
    window.localStorage.setItem(
      "progress",
      JSON.stringify([false, true, false, true, false, false, false, false])
    );
    const { container } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(window.localStorage.setOfImages).not.toBe(undefined);
    expect(window.localStorage.progress).not.toBe(undefined);
    const images = container.querySelectorAll(".cardItem");
    const progress = window.localStorage.progress
      ? JSON.parse(window.localStorage.progress)
      : [];
    images.forEach((card, index) => {
      const pattern = progress[index] ? /^animal-([1-8]).jpg/ : /cardBack/;
      expect(card.getAttribute("alt")).toMatch(pattern);
    });
  });
});
