import React from "react";
import TestBase from "./TestBase";
import { observer } from "mobx-react";
import { buttonMixin } from "../../utils/styles";
import { Button } from "@mui/material";
import TestsStore from "../../store/TestsStore";
import TestsService from "../../services/tests/tests.service";
import _ from "lodash";
import withRouter from "../../utils/withRouter";
import ModalWindowsStore from "../../store/ModalWindowsStore";
import { AxiosError } from "axios";
import { IError } from "../../models/common";

class TestEdit extends TestBase {
  mode = "edit";

  endTest(): void {
    ModalWindowsStore.successMessage = "Тест успешно сохранён!";
    this.props.navigate?.("/");
  }

  componentDidUpdate(): void {
    const { questions, index } = this.state;
    const question = questions[index];
    if (
      !_.isEqual(questions[index], TestsStore.selectedTest?.questions?.[index]) &&
      TestsStore.selectedTest?.id &&
      question
    ) {
      TestsService.updateQuestion(
        TestsStore.selectedTest?.id,
        question.question,
        question.answerOptions.map(option => option.answerText),
        "",
        question.id
      ).catch((error: AxiosError<IError>) => {
        if (error.response?.data?.errorMessage) {
          ModalWindowsStore.errorMessage = error.response.data.errorMessage;
        }
      });
    }
  }

  nextStep(): void {
    const { index, questions } = this.state;
    index + 1 < questions.length ? this.setState({ index: index + 1 }) : this.endTest();
  }

  createNewQuestion(): void {
    if (TestsStore.selectedTest?.id) {
      TestsService.createQuestion(
        TestsStore.selectedTest?.id,
        "Введите вопрос",
        ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        "Ответ 1"
      ).then(res => {
        TestsStore.updateQuestions(res);
        this.setState({
          questions: [...this.state.questions, res],
          index: (TestsStore.selectedTest?.questions?.length || 1) - 1 || this.state.index,
        });
      });
    }
  }

  renderButtons(): React.ReactElement {
    const { index, selectedAnswers, questions } = this.state;

    return (
      <>
        {index > 0 && (
          <Button sx={buttonMixin} onClick={(): void => this.setState({ index: index - 1 })} disabled={index <= 0}>
            {"<"}
          </Button>
        )}
        <Button sx={buttonMixin} onClick={(): void => this.createNewQuestion()}>
          {"+"}
        </Button>
        {selectedAnswers.find(el => el.question === questions[index]?.id) && (
          <Button sx={buttonMixin} onClick={(): void => this.nextStep()}>
            {">"}
          </Button>
        )}
      </>
    );
  }
}

export default observer(withRouter(TestEdit));
