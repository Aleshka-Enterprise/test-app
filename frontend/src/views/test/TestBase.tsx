import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import EditableTypography from "../../components/editable-typography/EditableTypography";
import TestsStore from "../../store/TestsStore";
import TestsService from "../../services/tests/tests.service";
import { IQuestion } from "../test-result/TestResult.test";
import { IUserAnswer } from "../../models/tests/tests";
import UserStore from "../../store/UsersStore";

interface TestBaseProps {
  navigate?: (value: string) => void;
}

interface TestBaseState {
  index: number;
  questions: IQuestion[];
  selectedAnswers: Omit<IUserAnswer, "id">[];
}

/**
 * Базовый компонент теста
 */
abstract class TestBase extends React.Component<TestBaseProps, TestBaseState> {
  abstract mode: string;

  constructor(props: TestBaseProps) {
    super(props);
    this.state = {
      index: 0,
      questions: [],
      selectedAnswers: [],
    };
  }

  componentDidMount(): void {
    TestsStore.selectedTest?.id &&
      TestsService.getTest(TestsStore.selectedTest?.id).then(test => {
        this.setState({ questions: test.questions || [] });
        TestsService.getUserAnswersList(TestsStore.selectedTest?.id).then(res => {
          const answersQuestionsIds = res.map(userAnswer => userAnswer.question);
          const index = (test.questions || []).findIndex(question => !answersQuestionsIds.includes(question.id));
          this.setState({ index: Math.max(index, 0), selectedAnswers: res });
        });
      });
  }

  onAnswerSelect(question: number, selectedAnswer: number): void {
    const answer: Omit<IUserAnswer, "id"> = {
      question,
      selectedAnswer,
      user: UserStore.user?.id as number,
      test: TestsStore.selectedTest?.id as number,
    };
    if (this.state.selectedAnswers.find(answer => answer.question === question)) {
      this.setState({
        selectedAnswers: this.state.selectedAnswers.map(el => (el.question !== answer.question ? el : answer)),
      });
    } else {
      this.setState({
        selectedAnswers: [...this.state.selectedAnswers, answer],
      });
    }
  }

  abstract renderButtons(): React.ReactElement;

  render(): React.ReactNode {
    const { index, questions, selectedAnswers } = this.state;
    return (
      <Box sx={{ height: "100vh", background: "#5e5e73", padding: "0 450px", position: "relative", display: "flex" }}>
        <Box sx={{ display: "flex", paddingTop: "50px", position: "absolute", left: "25px", top: "-40px" }}>
          <Typography sx={{ fontSize: "32px", color: "gold" }}>{this.state.index}</Typography>
          <Typography sx={{ fontSize: "32px", color: "white" }}>/{questions.length}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "50px" }}>
          <Box sx={{ fontSize: "48px", fontWeight: 500, color: "white", display: "flex" }}>
            {index + 1}.{" "}
            <EditableTypography
              onChange={(): void => {}}
              value={questions[index]?.question}
              canChange={this.mode === "edit"}
              sx={{ color: "white", fontSize: "48px", fontWeight: 500 }}
            />
          </Box>
          <Box>
            {questions[index]?.answerOptions?.map(el => {
              return (
                <Box
                  key={el.id}
                  sx={{
                    color: "white",
                    marginTop: "30px",
                    fontSize: "36px",
                    fontWeight: 400,
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox
                    sx={{ path: { color: "white" } }}
                    checked={
                      el.id === selectedAnswers.find(answer => answer.question === questions[index].id)?.selectedAnswer
                    }
                    onClick={(): void => this.onAnswerSelect(questions[index]?.id, el.id)}
                  />
                  <EditableTypography
                    onChange={(): void => {}}
                    value={el.answerText}
                    canChange={this.mode === "edit"}
                    sx={{ color: "white", fontSize: "48px", fontWeight: 500 }}
                  />
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              bottom: "50px",
              width: "200px",
            }}
          >
            {this.renderButtons()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default TestBase;
