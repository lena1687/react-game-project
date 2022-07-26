import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import React from "react";
import { Content } from "./Content";

describe("Content pages", () => {
  it("loading Main page", async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(getByText(/Hi, my friend/i)).toBeInTheDocument();
  });

  it("loading page - not Found", async () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    const { getByAltText } = render(
      <Router location={history.location} navigator={history}>
        <Content />
      </Router>
    );
    expect(getByAltText(/not-found-page/i)).toBeInTheDocument();
  });
});
