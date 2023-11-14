import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DropDown from "./DropDown";
import { ITestCategory } from "../../models/tests/tests";

const categoryList: ITestCategory[] = [
  { id: 0, title: "Все" },
  { id: 1, title: "Категория 1" },
  { id: 2, title: "Категория 2" },
  { id: 3, title: "Категория 3" },
  { id: 4, title: "Категория 4" },
];

const Container = (): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<ITestCategory>();
  return (
    <DropDown
      options={categoryList}
      selectedOptionId={selectedCategory?.id}
      onOptionSelect={setSelectedCategory}
      name={selectedCategory?.title || "Категория"}
    />
  );
};

describe("<DropDown />", () => {
  it("Компонент рендерится", () => {
    render(<Container />);

    expect(screen.getByText("Категория")).toBeInTheDocument();
    expect(screen.queryByTestId("option")).not.toBeInTheDocument();
  });

  it("Список открывается", () => {
    render(<Container />);

    fireEvent.click(screen.getByText("Категория"));
    expect(screen.queryAllByTestId("option")).toHaveLength(5);
    expect(screen.getByText("Все")).toBeInTheDocument();
    expect(screen.getByText("Категория 1")).toBeInTheDocument();
    expect(screen.getByText("Категория 2")).toBeInTheDocument();
    expect(screen.getByText("Категория 3")).toBeInTheDocument();
    expect(screen.getByText("Категория 4")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Категория 3"));
  });

  it("Элемент выбирается", () => {
    render(<Container />);

    fireEvent.click(screen.getByText("Категория"));
    expect(screen.queryAllByTestId("option")).toHaveLength(5);
    expect(screen.getByText("Все")).toBeInTheDocument();
    expect(screen.getByText("Категория 1")).toBeInTheDocument();
    expect(screen.getByText("Категория 2")).toBeInTheDocument();
    expect(screen.getByText("Категория 3")).toBeInTheDocument();
    expect(screen.getByText("Категория 4")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Категория 3"));

    expect(screen.getByTestId("btn")).toHaveTextContent("Категория 3");
  });
});
