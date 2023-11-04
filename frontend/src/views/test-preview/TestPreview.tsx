import { Box } from "@mui/material";
import React from "react";
import { ITest } from "../../models/tests/tests";

interface TestPreview {
  selectedTest: ITest,
}

/**
 * Предпросмотр выбранного теста
 */
const TestPreview = ({ selectedTest }: TestPreview): React.ReactElement => {
  return (
    <Box></Box>
  );
};

export default TestPreview;
