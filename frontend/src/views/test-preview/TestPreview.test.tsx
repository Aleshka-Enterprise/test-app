import React from "react";
import { render, screen } from "@testing-library/react";
import TestPreview from "./TestPreview";
import { IAnswer, ITest } from "../../models/tests/tests";
import { BrowserRouter } from "react-router-dom";
import TestsStore from "../../store/tests";

const answers: IAnswer[] = [
  { id: 1, answerText: "text_1" },
  { id: 2, answerText: "text_2" },
  { id: 3, answerText: "text_3" },
  { id: 4, answerText: "text_4" },
];

const selectedTest: ITest = {
  description: "test description",
  id: 1,
  title: "title",
  author: {
    id: 1,
    username: "author",
  },
  category: {
    id: 1,
    title: "category",
  },
  questions: [
    {
      id: 1,
      question: "question 1",
      answerOptions: answers,
    },
    {
      id: 2,
      question: "question 2",
      answerOptions: answers,
    },
  ],
};

describe("<TestPreview />", () => {
  beforeEach(() => {
    TestsStore.selectedTest = selectedTest;
    render(
      <BrowserRouter>
        <TestPreview />
      </BrowserRouter>
    );
  });

  it("Страница рендерится", () => {
    expect(screen.getByText(selectedTest.title)).toBeInTheDocument();
    expect(screen.getByText(selectedTest.description as string)).toBeInTheDocument();
  });
});
