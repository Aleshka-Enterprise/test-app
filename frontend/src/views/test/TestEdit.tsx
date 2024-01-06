import React from "react";
import TestBase from "./TestBase";
// eslint-disable-next-line no-unused-vars
import { observer } from "mobx-react";
import { buttonMixin } from "../../utils/styles";
import { Button } from "@mui/material";
import TestsStore from "../../store/TestsStore";
import TestsService from "../../services/tests/tests.service";

@observer
class TestEdit extends TestBase {
  mode = "edit";

  endTest(): void {
    this.props.navigate?.("/");
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
        this.setState({ index: TestsStore.selectedTest?.questions?.length || this.state.index });
      });
    }
  }

  renderButtons(): React.ReactElement {
    const { index, selectedAnswers, questions } = this.state;

    return (
      <>
        {index > 0 && (
          <Button sx={buttonMixin} onClick={(): void => this.setState({ index: index - 1 })}>
            {"<"}
          </Button>
        )}
        {selectedAnswers.find(el => el.question === questions[index].id) && (
          <Button sx={buttonMixin} onClick={(): void => this.createNewQuestion()}>
            {"+"}
          </Button>
        )}
        {selectedAnswers.find(el => el.question === questions[index].id) && (
          <Button sx={buttonMixin} onClick={(): void => this.nextStep()}>
            {">"}
          </Button>
        )}
      </>
    );
  }
}

export default TestEdit;
