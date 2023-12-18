import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Registration from "./Registration";
import UsersService from "../../services/users/users.service";
import { IUser } from "../../models/users/users";
import { Router, Navigator } from "react-router";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";

const user: IUser = {
  username: "user_name",
  firstName: "first_name",
  lastName: "last_name",
  email: "email@emai.com",
  id: 1,
};

const mockedUsedNavigate = jest.fn();

describe("<Registration />", () => {
  beforeEach(() => {
    jest.spyOn(UsersService, "registration").mockImplementationOnce(() => Promise.resolve(user));

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: (): jest.Mock => mockedUsedNavigate,
    }));

    render(
      <Router location={""} navigator={{ push: () => {} } as unknown as Navigator}>
        <Registration />
      </Router>
    );
  });

  it("Компонент рендерится", () => {
    expect(screen.getAllByText("Регистрация")).toHaveLength(2);
    expect(screen.getByPlaceholderText("Имя пользователя")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите пароль")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Повторите пароль")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Фамилия")).toBeInTheDocument();
  });

  it("Если поля не заполнены, то появляются ошибки", async () => {
    expect(screen.queryByText(REQUIRED_FIELD_ERROR)).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("btn"));
    });

    expect(await screen.findAllByText(REQUIRED_FIELD_ERROR)).toHaveLength(6);
  });

  it("Если заполнены не все обязательные поля, то появляется ошибка", async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "P@ss1" } });
      fireEvent.change(screen.getByPlaceholderText("Повторите пароль"), { target: { value: "P@ss1" } });
      fireEvent.click(screen.getByTestId("btn"));
    });

    expect(await screen.findAllByText(REQUIRED_FIELD_ERROR)).toHaveLength(3);
  });

  it("Если заполнены не все обязательные поля, то появляется ошибка", async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "P@ss1" } });
      fireEvent.change(screen.getByPlaceholderText("Повторите пароль"), { target: { value: "P@ss1" } });
      fireEvent.click(screen.getByTestId("btn"));
    });

    expect(await screen.findAllByText(REQUIRED_FIELD_ERROR)).toHaveLength(3);
  });

  it("Если заполнены все обязательные поля, то ошибок нет", async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "P@ss1" } });
      fireEvent.change(screen.getByPlaceholderText("Повторите пароль"), { target: { value: "P@ss1" } });
      fireEvent.change(screen.getByPlaceholderText("Имя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Фамилия"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "email@email.com" } });
      fireEvent.click(screen.getByTestId("btn"));
    });

    expect(screen.queryByText(REQUIRED_FIELD_ERROR)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(UsersService.registration).toBeCalled();
    });
  });

  it("Если Пароли не совпадают, то появляется ошибка", async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Введите пароль"), { target: { value: "P@ss1" } });
      fireEvent.change(screen.getByPlaceholderText("Повторите пароль"), { target: { value: "P@ss2e" } });
      fireEvent.change(screen.getByPlaceholderText("Имя"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Фамилия"), { target: { value: "Пользователь" } });
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "email@email.com" } });
      fireEvent.click(screen.getByTestId("btn"));
    });

    expect(await screen.findAllByText("Пароли должны совпадать")).toHaveLength(2);
  });
});
