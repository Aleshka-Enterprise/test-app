import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EditableTypography from "./EditableTypography";

describe("<EditableTypography />", () => {
  test("Компонент рендерится", async () => {
    render(<EditableTypography value={"Текст"} canChange={true} onChange={(value: string): void => {}} />);

    expect(screen.getByText("Текст")).toBeInTheDocument();
    expect(screen.getByTestId("text")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("input")).not.toBeInTheDocument();
    });
  });

  test("При двойном клике включается режим редактирования", async () => {
    const onChangeMock = jest.fn();
    render(<EditableTypography value={"Текст"} canChange={true} onChange={onChangeMock} />);

    await waitFor(() => {
      expect(screen.queryByTestId("input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("text")).toBeInTheDocument();
    });

    fireEvent.dblClick(screen.getByText("Текст"));

    await waitFor(() => {
      expect(screen.queryByTestId("input")).toBeInTheDocument();
      expect(screen.queryByTestId("text")).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("input"), { target: { value: "Новый текст" } });
    fireEvent.blur(screen.getByTestId("input"));

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith("Новый текст");
    });
  });

  test("Если отключена возможность редактирования, то текст нельзя редактировать", async () => {
    render(<EditableTypography value={"Текст"} canChange={false} onChange={(value: string): void => {}} />);

    await waitFor(() => {
      expect(screen.queryByTestId("input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("text")).toBeInTheDocument();
    });

    fireEvent.dblClick(screen.getByText("Текст"));

    await waitFor(() => {
      expect(screen.queryByTestId("input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("text")).toBeInTheDocument();
    });
  });
});
