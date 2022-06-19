import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("render Header", () => {
    const { getByTestId, getByText } = render(<Header />);
    const container = getByTestId("header-container");
    expect(container).toHaveClass("container");
    const logoBlock = getByTestId("header-logo-block");
    expect(container).toContainElement(logoBlock);
    expect(logoBlock).toHaveAttribute("href", "/");
    expect(logoBlock).toContainElement(getByTestId("header-logo"));
    const logoLabel = getByTestId("header-logo-label");
    expect(logoBlock).toContainElement(logoLabel);
    expect(logoLabel).toHaveClass("logoLabel");
    expect(getByText("Welcome to the game")).toBeInTheDocument();
    const headerInfo = getByTestId("header-info");
    expect(container).toContainElement(headerInfo);
    expect(headerInfo).toHaveClass("info");
    expect(headerInfo).toHaveAttribute(
      "href",
      "https://github.com/lena1687/react-game-project"
    );
    expect(headerInfo).toHaveAttribute("target", "_blank");
    expect(getByText("Go to repo")).toBeInTheDocument();
  });
});
