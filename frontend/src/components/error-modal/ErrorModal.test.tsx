import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ErrorModal from "./ErrorModal";
import ModalWindowsStore from "../../store/ModalWindowsStore";

describe("<ErrorModal />", () => {
  test("Компонент рендерится", async () => {
    render(<ErrorModal />);

    await waitFor(() => {
      expect(screen.queryByText("Тестовая ошибка")).not.toBeInTheDocument();
    });

    ModalWindowsStore.errorMessage = "Тестовая ошибка";

    await waitFor(() => {
      expect(screen.getByText("Тестовая ошибка")).toBeInTheDocument();
    });
  });

  test("Модальное окно закрывается", async () => {
    ModalWindowsStore.errorMessage = "Тестовая ошибка";
    render(<ErrorModal />);

    await waitFor(() => {
      expect(screen.getByText("Тестовая ошибка")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("OK"));
    });

    await waitFor(() => {
      expect(screen.queryByText("Тестовая ошибка")).not.toBeInTheDocument();
      expect(ModalWindowsStore.errorMessage).toBe(undefined);
    });
  });
});
