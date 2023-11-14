export interface IAuthor {
  id: number;
  username: string;
}

export interface ITestCategory {
  id: number;
  title: string;
}

export interface IAnswer {
  id: number;
  answerText: string;
}

export interface IQuestion {
  id: number;
  question: string;
  answerOptions: IAnswer[];
}

export interface ITest {
  description?: string;
  id: number;
  title: string;
  img?: string;
  author: IAuthor;
  category: ITestCategory;
  questions?: IQuestion[];
}

export interface IUserAnswer {
  user: number;
  test: number;
  selectedAnswer: number;
  question: number;
  id: number;
}

export interface ITestResult {
  rightAnswer: number;
  id: number;
  question: IQuestion;
  selectedAnswer: number;
}
