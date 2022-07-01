import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Content } from "Structures/Content";
import React from "react";

describe("MemoryCards", () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

  it("error loading  game-page", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(window.localStorage.setOfImages).toBe(undefined);
    expect(container.getElementsByClassName("errorMessage").length).toBe(1);
    expect(container.getElementsByClassName("cardsWrap").length).toBe(0);
  });

  it("initial success loading game-page", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    window.localStorage.setItem(
      "setOfImages",
      '[{"value":"animalTheme","images":["animal-1.jpg","animal-2.jpg","animal-3.jpg","animal-4.jpg","animal-5.jpg","animal-6.jpg","animal-7.jpg","animal-8.jpg"]},{"value":"superHeroesTheme","images":["hero-1.jpg","hero-2.jpg","hero-3.jpg","hero-4.jpg","hero-5.jpg","hero-6.jpg","hero-7.jpg","hero-8.jpg"]}]'
    );
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(container.getElementsByClassName("errorMessage").length).toBe(0);
    expect(container.getElementsByClassName("cardsWrap").length).toBe(1);
    expect(screen.getByText("So, Andy")).toBeInTheDocument();
    const cardItem = container.getElementsByClassName("cardItem");
    expect(cardItem).toHaveLength(8);
  });

  it("success loading game-page without progress", async () => {
    const history = createMemoryHistory();
    history.push("/memory-cards?userName=Andy&complexity=8&theme=animalTheme");
    window.localStorage.setItem(
      "setOfImages",
      '[{"value":"animalTheme","images":["animal-1.jpg","animal-2.jpg","animal-3.jpg","animal-4.jpg","animal-5.jpg","animal-6.jpg","animal-7.jpg","animal-8.jpg"]},{"value":"superHeroesTheme","images":["hero-1.jpg","hero-2.jpg","hero-3.jpg","hero-4.jpg","hero-5.jpg","hero-6.jpg","hero-7.jpg","hero-8.jpg"]}]'
    );
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(window.localStorage.setOfImages).not.toBe(undefined);
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
    const { container } = render(
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
