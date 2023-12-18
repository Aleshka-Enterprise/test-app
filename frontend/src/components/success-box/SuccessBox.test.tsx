import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SuccessBox from "./SuccessBox";
import ModalWindowsStore from "../../store/ModalWindowsStore";

describe("<SuccessBox />", () => {
  test("Компонент рендерится", async () => {
    render(<SuccessBox />);

    await waitFor(() => {
      expect(screen.queryByText("Сохранено")).not.toBeInTheDocument();
    });

    ModalWindowsStore.successMessage = "Сохранено";

    await waitFor(() => {
      expect(screen.getByText("Сохранено")).toBeInTheDocument();
    });
  });

  test("Модальное окно закрывается", async () => {
    ModalWindowsStore.errorMessage = "Сохранено";
    render(<SuccessBox />);

    await waitFor(() => {
      expect(screen.getByText("Сохранено")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTestId("close"));
    });

    await waitFor(() => {
      expect(screen.queryByText("Сохранено")).not.toBeInTheDocument();
      expect(ModalWindowsStore.successMessage).toBe(undefined);
    });
  });

  test("Окно закрывается через 5 секунд после получения сообщения", async () => {
    ModalWindowsStore.successMessage = "Сохранено";
    jest.useFakeTimers();
    render(<SuccessBox />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("Сохранено")).not.toBeInTheDocument();
  });
});
