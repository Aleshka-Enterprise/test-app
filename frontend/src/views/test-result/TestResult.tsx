import React, { useEffect, useMemo, useState } from "react";
import { ITest, ITestResult } from "../../models/tests/tests";
import { Box, Typography, Button } from "@mui/material";
import TestsService from "../../services/tests/tests.service";
import { observer } from "mobx-react";
import { buttonMixin } from "../../utils/styles";

interface TestResultProps {
selectedTest: ITest,
}

/**
 * Страница с результатом теста
 */
const TestResult = observer(({ selectedTest }: TestResultProps): React.ReactElement => {
  const [result, setResult] = useState<ITestResult[]>([]);

  useEffect(() => {
    TestsService.getTestResult(selectedTest.id).then(test => {
      setResult(test);
    });
  }, [selectedTest]);

  const answers = result.map((res, index) => {

    const getAnswerText = (id: number): string | undefined => {
      return res.question.answer_options.find(el => el.id === id)?.answer_text;
    };

    return {
      step: index + 1,
      rightAnswer: getAnswerText(res.rightAnswer),
      selectedAnswer: getAnswerText(res.selectedAnswer),
      question: res.question.question,
    };
  });

  const numberOfCorrectAnswers: number = useMemo(() => {
    return result.reduce((acc, dec): number => {
      if (dec.selectedAnswer === dec.rightAnswer) {
        return acc += 1;
      };
      return acc;
    }, 0);
  }, [result]);

  return (
    <Box>
      <Box sx={{ height: "150px", background: "#5e5e73", padding: "50px 450px", position: "relative", display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "white",
            fontSize: "18px",
          }
        }>
          <Box>
            <Typography sx={{ textAlign: "center" }}>Тесты | {selectedTest.category.title}</Typography>
            <Typography sx={{ fontSize: "36px", verticalAlign: "center" }}>{selectedTest.title}</Typography>
            <Button sx={{ ...buttonMixin, margin: "30px auto", float: "none", display: "flex" }}>Пройти тест ещё раз</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "30px 450px", fontSize: "18px", }}>
        <Typography>Правильных ответов: {numberOfCorrectAnswers} из {result.length}</Typography>
        <Typography>Процент правильных ответов: {numberOfCorrectAnswers / result.length * 100}%</Typography>
        <Box sx={{ marginTop: "20px" }}>
          {answers.map(answer => {
            return (
              <Box
                key={answer.question}
                sx={{
                  margin: "20px 0",
                  background: "#F1F4F7",
                  padding: "10px",
                }}
              >
                <Typography>{answer.step}. {answer.question}</Typography>
                <Box sx={{ marginLeft: "20px" }}>
                  <Typography>{answer.rightAnswer}</Typography>
                  <Typography
                    sx={{ color: answer.rightAnswer === answer.selectedAnswer ? "#00ff00" : "red" }}
                  >
                    {answer.selectedAnswer}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
});

export default TestResult;