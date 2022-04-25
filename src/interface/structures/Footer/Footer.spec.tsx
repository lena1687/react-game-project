import { getNodeText, render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const currentYear = new Date().getFullYear();

describe("Footer", () => {
  it("render Footer", () => {
    const { container, getByText } = render(<Footer />);
    expect(getByText("Elena Sedelnikova")).toBeInTheDocument();
    const contacts = container.querySelectorAll(".contacts")[0];
    expect(contacts).toHaveAttribute("href", "mailto:lena1687@mail.ru");
    const copyright = container.querySelectorAll(".copyright")[0];
    expect(copyright).toHaveClass("copyright");
    expect(getNodeText(copyright as HTMLElement)).toEqual(
      `Copyright ©${currentYear}`
    );
    // screen.debug();
  });
});
