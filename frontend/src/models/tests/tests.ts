export interface IAuthor {
  id: number;
  username: string;
}

export interface ITestCategory {
  id: number;
  title: string
}

export interface IAnswer {
  id: number;
  answerText: string;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
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