import { createMemoryHistory } from "history";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Content } from "Structures/Content";
import React from "react";
import {
  mockLocalStorage,
  renderWithProviders,
} from "../../../utils/test-utils";
import MOCK_DATA_THEMES from "Assets/data/themesMemoryCards.json";
import MemoryCardsSlice, { initialState } from "Slices/MemoryCardsSlice";
import { setupStore } from "../../../redux/store";
import { MemoryCards } from "Pages/MemoryCards/MemoryCards";
import MOCK_DATA_INITIAL_LOCAL_STORAGE from "Assets/data/memoryCardsInitialLocalStorage.json";
import MOCK_DATA_SECOND_LOCAL_STORAGE from "Assets/data/memoryCardsSecondLocalStorage.json";
import MOCK_DATA_FINALLY_LOCAL_STORAGE from "Assets/data/memoryCardsFinalyLocalStorage.json";

const mockStorage = mockLocalStorage();

describe("MemoryCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA_THEMES),
    })
  ) as jest.Mock;

  it("Should return the initial state", () => {
    expect(MemoryCardsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("Should initially set games to an empty object", () => {
    const state = setupStore().getState().MemoryCards;
    expect(state).toEqual(initialState);
  });

  it("Error loading  game-page", async () => {
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

  it("Initial success loading game-page - without progress", async () => {
    const nameStorage = "dataMemoryCards-8-animalTheme-Andy";
    const mockMemoryCardsInitialLocalStorage = JSON.stringify(
      MOCK_DATA_INITIAL_LOCAL_STORAGE
    );
    mockStorage.set(nameStorage, mockMemoryCardsInitialLocalStorage);

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
    const images = container.querySelectorAll(".cardItem");
    expect(images).toHaveLength(8);
    MOCK_DATA_INITIAL_LOCAL_STORAGE.progress.forEach((card, idx) => {
      expect(images[idx].getAttribute("alt")).toMatch(/cardBack/);
    });
  });

  it("Initial success loading game-page - with progress", async () => {
    const nameStorage = "dataMemoryCards-8-animalTheme-Andy";
    const mockMemoryCardsSecondLocalStorage = JSON.stringify(
      MOCK_DATA_SECOND_LOCAL_STORAGE
    );
    mockStorage.set(nameStorage, mockMemoryCardsSecondLocalStorage);

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
    const images = container.querySelectorAll(".cardItem");
    expect(images.length).toBe(8);
    const pattern = /^animalTheme\/animal-([1-8]).jpg/;
    MOCK_DATA_SECOND_LOCAL_STORAGE.progress.forEach((value, idx) => {
      expect(images[idx].getAttribute("alt")).toMatch(
        value ? pattern : /cardBack/
      );
    });

    // if clicked to another card with success result
    act(() => {
      fireEvent.click(images[0]);
    });
    await waitFor(() => {
      expect(images[0].getAttribute("alt")).toMatch(pattern);
    });
    fireEvent.click(images[4]);
    await waitFor(() => {
      expect(images[4].getAttribute("alt")).toMatch(pattern);
    });
    const localStorageProgress = JSON.parse(
      mockStorage.get(nameStorage)!
    )!.progress;
    expect(localStorageProgress[0]).toBeTruthy();
    expect(localStorageProgress[4]).toBeTruthy();

    // // if clicked to another card with error result
    fireEvent.click(images[2]);
    await waitFor(() => {
      expect(images[2].getAttribute("alt")).toMatch(pattern);
    });
    fireEvent.click(images[3]);
    await waitFor(() => {
      expect(images[2].getAttribute("alt")).toMatch(/cardBack/);
    });
    expect(images[3].getAttribute("alt")).toMatch(/cardBack/);
    expect(localStorageProgress[2]).toBeFalsy();
    expect(localStorageProgress[3]).toBeFalsy();

    //// if clicked to the same card second time
    fireEvent.click(images[7]);
    await waitFor(() => {
      expect(images[7].getAttribute("alt")).toMatch(pattern);
    });
    fireEvent.click(images[7]);
    await waitFor(() => {
      expect(images[7].getAttribute("alt")).toMatch(/cardBack/);
    });
    expect(localStorageProgress[7]).toBeFalsy();
  });

  it("Final game-page", async () => {
    const nameStorage = "dataMemoryCards-8-animalTheme-Andy";
    const mockMemoryCardsFinallyLocalStorage = JSON.stringify(
      MOCK_DATA_FINALLY_LOCAL_STORAGE
    );
    mockStorage.set(nameStorage, mockMemoryCardsFinallyLocalStorage);

    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    const { container, getByText } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    await waitFor(() => {
      expect(container.getElementsByClassName("errorMessage").length).toBe(0);
    });
    expect(container.getElementsByClassName("cardsWrap").length).toBe(1);
    expect(screen.getByText("So, Andy")).toBeInTheDocument();
    const images = container.querySelectorAll(".cardItem");
    const pattern = /^animalTheme\/animal-([1-8]).jpg/;
    act(() => {
      fireEvent.click(images[1]);
    });
    await waitFor(() => {
      expect(images[1].getAttribute("alt")).toMatch(pattern);
    });
    const localStorageProgress = JSON.parse(
      mockStorage.get(nameStorage)!
    )!.progress;
    await waitFor(() => {
      expect(localStorageProgress[1]).toBeTruthy();
    });
    expect(getByText("Congratulations!!!")).toBeInTheDocument();
  });

  it("Reset game-page", async () => {
    const nameStorage = "dataMemoryCards-8-animalTheme-Andy";
    const mockMemoryCardsSecondLocalStorage = JSON.stringify(
      MOCK_DATA_SECOND_LOCAL_STORAGE
    );
    mockStorage.set(nameStorage, mockMemoryCardsSecondLocalStorage);

    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    const { container, getByText } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    await waitFor(() => {
      expect(container.getElementsByClassName("errorMessage").length).toBe(0);
    });
    expect(container.getElementsByClassName("cardsWrap").length).toBe(1);
    act(() => {
      fireEvent.click(getByText("Restart a game"));
    });
    expect(mockStorage.has(nameStorage)).toBe(false);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
