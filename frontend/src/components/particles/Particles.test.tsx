import React from "react";
import { render, screen } from "@testing-library/react";
import Particles from "./Particles";

describe("<Paginator />", () => {
  it("компонент рендерится", () => {
    render(<Particles />);

    expect(screen.getByTestId("particles")).toBeInTheDocument();
  });
});
