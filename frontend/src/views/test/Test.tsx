import React, { useEffect, useState } from "react";
import { IQuestion, ITest, IUserAnswer } from "../../models/tests/tests";
import { Box, Typography, Checkbox, Button } from "@mui/material";
import TestsService from "../../services/tests/tests.service";
import { observer } from "mobx-react";
import UserStore from "../../store/users";
import { buttonMixin } from "../../utils/styles";

interface TestProps {
selectedTest: ITest,
}

/**
 * Страница для прохождения теста
 */
const Test = observer(({ selectedTest }: TestProps): React.ReactElement => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Omit<IUserAnswer, "id">[]>([]);

  useEffect(() => {
    TestsService.getTest(selectedTest.id).then(test => {
      setQuestions(test.questions || []);
      TestsService.getUserAnswersList(selectedTest.id).then(res => {
        setSelectedAnswers(res);
        const answersQuestionsIds = res.map(userAnswer => userAnswer.question);
        const index = (test.questions || []).findIndex(question => !answersQuestionsIds.includes(question.id));
        setIndex(Math.max(index, 0));
      });
    });
  }, [selectedTest]);

  const onAnswerSelect = (question: number, selectedAnswer: number): void => {
    const anser: Omit<IUserAnswer, "id"> = {
      question,
      selectedAnswer,
      user: UserStore.user?.id as number,
      test: selectedTest.id,
    }
    if (selectedAnswers.find(answer => answer.question === question)) {
      setSelectedAnswers(selectedAnswers.map(el => el.question !== anser.question ? el : anser));
    } else {
      setSelectedAnswers([...selectedAnswers, anser]);
    }
  };

  const endTest = (): void => {

  };

  const submitAnswer = (): void => {
    TestsService.submitAnswer(selectedAnswers[index]).then(res => {
      index + 1 < questions.length ? setIndex(index + 1) : endTest();
    });
  };

  return (
    <Box sx={{ height: "100vh", background: "#5e5e73", padding: "0 450px", position: "relative", display: "flex" }}>
      <Box sx={{ display: "flex", paddingTop: "50px", position: "absolute", left: "25px", top: "-40px" }}>
        <Typography sx={{ fontSize: "32px", color: "gold" }}>{index}</Typography>
        <Typography sx={{ fontSize: "32px", color: "white" }}>/{questions.length}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "50px" }}>
        <Box sx={{ fontSize: "48px", fontWeight: 500, color: "white" }}>{index + 1}. {questions[index]?.question}</Box>
        <Box>
          {questions[index]?.answers?.map(el => {
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
                onClick={(): void => onAnswerSelect(questions[index]?.id, el.id)}
              > 
                <Checkbox
                  sx={{ "path": { color: "white" } }}
                  checked={el.id === selectedAnswers.find(anser => anser.question === questions[index].id)?.selectedAnswer}
                />
                <Box sx={{ marginLeft: "20px" }}>{el.answer_text}</Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {index > 0 && (
            <Button sx={buttonMixin} onClick={(): void => setIndex(index - 1)}>{"<"}</Button>
          )}
          {selectedAnswers.find(el => el.question === questions[index].id) && (
            <Button
              sx={buttonMixin}
              onClick={(): void => submitAnswer()}
            >
              {">"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default Test;