import React from "react";
import TestBase from "./TestBase";
// eslint-disable-next-line no-unused-vars
import { observer } from "mobx-react";
import { buttonMixin } from "../../utils/styles";
import { Button } from "@mui/material";
import TestsService from "../../services/tests/tests.service";
import withRouter from "../../utils/withRouter";

@observer
class TestPassing extends TestBase {
  mode = "read";

  endTest(): void {
    this.props.navigate?.("/result/");
  }

  submitAnswer(): void {
    const { index, questions, selectedAnswers } = this.state;
    TestsService.submitAnswer(selectedAnswers[index]).then((): void => {
      index + 1 < questions.length ? this.setState({ index: index + 1 }) : this.endTest();
    });
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
          <Button sx={buttonMixin} onClick={(): void => this.submitAnswer()}>
            {">"}
          </Button>
        )}
      </>
    );
  }
}

export default withRouter(TestPassing);
