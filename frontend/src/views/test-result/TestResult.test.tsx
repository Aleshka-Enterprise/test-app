import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TestResult from "./TestResult";
import { IAnswer, ITest, ITestResult } from "../../models/tests/tests";
import { BrowserRouter } from "react-router-dom";
import TestsService from "../../services/tests/tests.service";
import TestsStore from "../../store/TestsStore";

const answers: IAnswer[] = [
  { id: 1, answerText: "text_1" },
  { id: 2, answerText: "text_2" },
  { id: 3, answerText: "text_3" },
  { id: 4, answerText: "text_4" },
];

export interface IQuestion {
  id: number;
  question: string;
  answerOptions: IAnswer[];
}

const questions: IQuestion[] = [
  { id: 1, question: "Кто?", answerOptions: answers },
  { id: 2, question: "Когда?", answerOptions: answers },
  { id: 3, question: "Зачем?", answerOptions: answers },
];

const testResult: ITestResult[] = [
  {
    rightAnswer: 2,
    id: 1,
    question: questions[0],
    selectedAnswer: 1,
  },
  {
    rightAnswer: 2,
    id: 2,
    question: questions[0],
    selectedAnswer: 3,
  },
  {
    rightAnswer: 4,
    id: 3,
    question: questions[0],
    selectedAnswer: 4,
  },
];

const selectedTest: ITest = {
  description: "test description",
  id: 1,
  title: "Загаловок теста",
  author: {
    id: 1,
    username: "author",
  },
  category: {
    id: 1,
    title: "Категория теста",
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

describe("<TestResult />", () => {
  beforeEach(() => {
    TestsStore.selectedTest = selectedTest;
    jest.spyOn(TestsService, "getTestResult").mockImplementationOnce(() => Promise.resolve(testResult));
    render(
      <BrowserRouter>
        <TestResult />
      </BrowserRouter>
    );
  });

  it("Страница рендерится", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Загаловок теста")).toBeInTheDocument();
      expect(screen.queryByText("Правильных ответов: 1 из 3")).toBeInTheDocument();
      expect(screen.queryByText("Процент правильных ответов: 33.33%")).toBeInTheDocument();
      expect(screen.queryByText("Тесты | Категория теста")).toBeInTheDocument();
    });
  });
});
