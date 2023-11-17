import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ITest } from "../../models/tests/tests";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import TestsStore from "../../store/tests";
import { buttonMixin } from "../../utils/styles";

/**
 * Предпросмотр выбранного теста
 */
const TestPreview = observer((): React.ReactElement => {
  const navigate = useNavigate();
  const selectedTest = TestsStore.selectedTest as ITest;
  console.log(TestsStore.selectedTest);

  return (
    <Box sx={{ height: "100vh", background: "#5e5e73", padding: "0 450px" }}>
      <Box sx={{ paddingTop: "50px" }}>
        <img
          src={selectedTest?.img}
          alt={selectedTest.title}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
            margin: "0 auto",
            display: "flex",
          }}
        />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            color: "white",
            fontSize: "32px",
            fontWeight: 400,
          }}
        >
          {selectedTest.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={(): void => {
              navigate("/test/");
            }}
            sx={{ ...buttonMixin, marginTop: "30px", width: "200px" }}
          >
            Начать тест
          </Button>
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: 400,
            margin: "20px auto",
          }}
        >
          {selectedTest.description}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: 400,
            marginTop: "50px",
          }}
        >
          Автор теста: {selectedTest.author.username}
        </Typography>
      </Box>
    </Box>
  );
});

export default TestPreview;
