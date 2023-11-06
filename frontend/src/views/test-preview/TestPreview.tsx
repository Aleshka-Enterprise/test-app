import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ITest } from "../../models/tests/tests";
import { useNavigate } from "react-router-dom";

interface TestPreviewProps {
  selectedTest: ITest,
}

/**
 * Предпросмотр выбранного теста
 */
const TestPreview = ({ selectedTest }: TestPreviewProps): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", background: "#5e5e73", padding: "0 450px" }}>
      <Box sx={{ paddingTop: "50px" }}>
        <img
          src={selectedTest.img}
          alt={selectedTest.title}
          style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%", margin: "0 auto", display: "flex" }}
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
            onClick={() => {
              navigate("/test/");
            }}
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              backgroundColor: "#32373d",
              alignItems: "center",
              transition: "0.3s",
              width: "250px",
              height: "50px",
              marginTop: "30px",
              marginBottom: "20px",
              borderRadius: "3px",
              border: "solid 1px #32373d",
              "&:hover": {
                background: "#00040a",
              }
            }}
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
            margin: "20px auto"
          }}
        >
          {selectedTest.description}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: 400,
            marginTop: "50px"
          }}
        >
          Автор теста: {selectedTest.author.username}
        </Typography>
      </Box>
    </Box>
  );
};

export default TestPreview;
