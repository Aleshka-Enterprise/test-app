import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ErrorModal from "./ErrorModal";
import ErrorsStore from "../../store/ErrorsStore";

describe("<ErrorModal />", () => {
  test("Компонент рендерится", async () => {
    render(<ErrorModal />);

    await waitFor(() => {
      expect(screen.queryByText("Тестовая ошибка")).not.toBeInTheDocument();
    });

    ErrorsStore.errorMessage = "Тестовая ошибка";

    await waitFor(() => {
      expect(screen.getByText("Тестовая ошибка")).toBeInTheDocument();
    });
  });

  test("Модальное окно закрывается", async () => {
    ErrorsStore.errorMessage = "Тестовая ошибка";
    render(<ErrorModal />);

    await waitFor(() => {
      expect(screen.getByText("Тестовая ошибка")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("OK"));
    });

    await waitFor(() => {
      expect(screen.queryByText("Тестовая ошибка")).not.toBeInTheDocument();
      expect(ErrorsStore.errorMessage).toBe(undefined);
    });
  });
});
