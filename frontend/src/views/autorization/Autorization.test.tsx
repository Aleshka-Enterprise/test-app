import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Autorization from "./Autorization";
import UsersService from "../../services/users/users.service";
import { IToken, IUser } from "../../models/users/users";
import { Router, Navigator } from "react-router";

const user: IUser = {
  username: "user_name",
  password: "password",
  firstName: "first_name",
  lastName: "last_name",
  email: "email@emai.com",
  id: 1,
};

const token: IToken = {
  token: "token",
};

const mockedUsedNavigate = jest.fn();

describe("<Autorization />", () => {
  beforeEach(() => {
    jest.spyOn(UsersService, "autorization").mockImplementationOnce(() => Promise.resolve(token));
    jest.spyOn(UsersService, "getCurrentUser").mockImplementationOnce(() => Promise.resolve(user));

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: (): jest.Mock => mockedUsedNavigate,
    }));

    render(
      <Router location={""} navigator={undefined as unknown as Navigator}>
        <Autorization />
      </Router>
    );
  });

  it("Компонент рендерится", () => {
    expect(screen.getByText("Авторизация")).toBeInTheDocument();
    expect(screen.getByText("Имя пользователя")).toBeInTheDocument();
    expect(screen.getByText("Пароль")).toBeInTheDocument();
    expect(screen.getByText("Авторизоваться")).toBeInTheDocument();
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  it("Если поля не заполнены, форма не отправляется", () => {
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");

    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
  });

  it("Если заполнен только пользователь, то форма не отправляется", () => {
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");

    fireEvent.change(screen.getByTestId("username"), { target: { value: "Пользователь" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
    expect(UsersService.autorization).not.toBeCalled();
    expect(UsersService.getCurrentUser).not.toBeCalled();
    expect(screen.getByTestId("username")).toHaveValue("Пользователь");
  });

  it("Если заполнен только пароль, то форма не отправляется", () => {
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");

    fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
    expect(UsersService.autorization).not.toBeCalled();
    expect(UsersService.getCurrentUser).not.toBeCalled();
    expect(screen.getByTestId("password")).toHaveValue("password123");
  });

  it("Если заполнены оба поля, то форма отправляется", () => {
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");

    fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("username"), { target: { value: "Пользователь" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(screen.getByTestId("password")).toHaveValue("password123");
    expect(screen.getByTestId("username")).toHaveValue("Пользователь");
  });
});
