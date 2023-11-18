import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import UsersService from "../../services/users/users.service";
import { Router, Navigator } from "react-router";

const mockedUsedNavigate = jest.fn();

describe("<Header />", () => {
  beforeEach(() => {
    jest.spyOn(UsersService, "logout").mockImplementationOnce(() => Promise.resolve());

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: (): jest.Mock => mockedUsedNavigate,
    }));

    render(
      <Router location={""} navigator={{ push: () => {} } as unknown as Navigator}>
        <Header />
      </Router>
    );
  });

  it("Компонент рендерится", () => {
    expect(screen.getByText("Test app")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
  });
});
