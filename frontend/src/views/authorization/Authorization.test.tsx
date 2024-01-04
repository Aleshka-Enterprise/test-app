import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Authorization from "./Authorization";
import UsersService from "../../services/users/users.service";
import { IToken, IUser } from "../../models/users/users";
import { Router, Navigator } from "react-router";

const user: IUser = {
  username: "user_name",
  firstName: "first_name",
  lastName: "last_name",
  email: "email@emai.com",
  id: 1,
};

const token: IToken = {
  token: "token",
};

const mockedUsedNavigate = jest.fn();

describe("<Authorization />", () => {
  beforeEach(() => {
    jest.spyOn(UsersService, "authorization").mockImplementationOnce(() => Promise.resolve(token));
    jest.spyOn(UsersService, "getCurrentUser").mockImplementationOnce(() => Promise.resolve(user));

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: (): jest.Mock => mockedUsedNavigate,
    }));

    render(
      <Router location={""} navigator={undefined as unknown as Navigator}>
        <Authorization />
      </Router>
    );
  });

  it("Компонент рендерится", () => {
    expect(screen.getByText("Авторизация")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите пароль")).toBeInTheDocument();
  });

  it("Если поля не заполнены, форма не отправляется", () => {
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("");
    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("");

    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
  });

  it("Если заполнен только пользователь, то форма не отправляется", () => {
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("");
    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("");

    fireEvent.change(screen.getByPlaceholderText("Введите имя пользователя"), { target: { value: "Пользователь" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
    expect(UsersService.authorization).not.toBeCalled();
    expect(UsersService.getCurrentUser).not.toBeCalled();
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("Пользователь");
  });

  it("Если заполнен только пароль, то форма не отправляется", () => {
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("");
    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("");

    fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(mockedUsedNavigate).not.toBeCalled();
    expect(UsersService.authorization).not.toBeCalled();
    expect(UsersService.getCurrentUser).not.toBeCalled();
    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("password123");
  });

  it("Если заполнены оба поля, то форма отправляется", () => {
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("");
    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("");

    fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("Введите имя пользователя"), { target: { value: "Пользователь" } });
    fireEvent.click(screen.getByText("Авторизоваться"));

    expect(screen.getByPlaceholderText("Введите пароль")).toHaveValue("password123");
    expect(screen.getByPlaceholderText("Введите имя пользователя")).toHaveValue("Пользователь");
  });
});
