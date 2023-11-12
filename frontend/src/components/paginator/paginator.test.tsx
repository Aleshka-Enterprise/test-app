import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Paginator from "./paginator";

interface IContainerProps {
  maxPage?: number;
}

const Container = ({ maxPage }: IContainerProps): React.ReactElement => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  return <Paginator onPageSelect={setSelectedPage} selectedPage={selectedPage} pageCount={maxPage ?? 10} />;
};

describe("<Paginator />", () => {
  it("компонент рендерится", () => {
    render(<Container />);

    expect(screen.getByText("Предыдущая")).toBeInTheDocument();
    expect(screen.getByText("Следующая")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("previous")).toHaveClass("disabled");
    expect(screen.getByTestId("next")).not.toHaveClass("disabled");
    expect(screen.getByText("1")).toHaveClass("selected");
  });

  it("Пагинатор прокручивается", () => {
    render(<Container />);

    fireEvent.click(screen.getByText("5"));
    expect(screen.getByText("5")).toHaveClass("selected");
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.getByTestId("next")).not.toHaveClass("disabled");
    expect(screen.getByTestId("previous")).not.toHaveClass("disabled");
    expect(screen.getAllByTestId("element")).toHaveLength(5);

    fireEvent.click(screen.getByText("7"));
    expect(screen.getByText("7")).toHaveClass("selected");
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
    expect(screen.getByTestId("next")).not.toHaveClass("disabled");
    expect(screen.getByTestId("previous")).not.toHaveClass("disabled");
    expect(screen.getAllByTestId("element")).toHaveLength(5);

    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("10"));
    expect(screen.getByText("10")).toHaveClass("selected");
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.queryByText("11")).not.toBeInTheDocument();
    expect(screen.getByTestId("next")).toHaveClass("disabled");
    expect(screen.getByTestId("previous")).not.toHaveClass("disabled");
    expect(screen.getAllByTestId("element")).toHaveLength(5);
  });

  it("Кнопки 'Предыдущая' и 'Следующая' работают.", () => {
    render(<Container />);

    expect(screen.getByTestId("previous")).toHaveClass("disabled");
    expect(screen.getByText("1")).toHaveClass("selected");
    expect(screen.queryByText("6")).not.toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.getAllByTestId("element")).toHaveLength(5);

    fireEvent.click(screen.getByTestId("next"));

    expect(screen.getByText("2")).toHaveClass("selected");
    expect(screen.getByText("1")).not.toHaveClass("selected");
    expect(screen.getByTestId("previous")).not.toHaveClass("disabled");
    expect(screen.getByTestId("next")).not.toHaveClass("disabled");
    expect(screen.getAllByTestId("element")).toHaveLength(5);

    fireEvent.click(screen.getByTestId("previous"));

    expect(screen.getByTestId("previous")).toHaveClass("disabled");
    expect(screen.getByText("1")).toHaveClass("selected");
    expect(screen.queryByText("6")).not.toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.getAllByTestId("element")).toHaveLength(5);
  });

  it("Страницы не рендартся выше указанного числа", () => {
    render(<Container maxPage={3} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("element")).toHaveLength(3);
  });
});
