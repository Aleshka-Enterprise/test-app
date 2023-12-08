import { Box, Typography } from "@mui/material";
import React from "react";
import { ITest } from "../../models/tests/tests";
import TestsStore from "../../store/TestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import noImage from "../../assets/images/no-image.png";

interface ITestCard {
  test: ITest;
}

const TestCard = observer(({ test }: ITestCard): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderRadius: "10px",
        cursor: "pointer",
        display: "flex",
        padding: "10px",
        background: "white",
        gap: "30px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        transition: "0.3s",
        position: "relative",
        marginTop: "30px",

        "&:hover": {
          boxShadow: "3px 6px 9px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={(): void => {
        TestsStore.selectedTest = test;
        navigate("/preview/");
      }}
    >
      <img
        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
        src={test.img || noImage}
        alt={test.title}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>{test.title}</Typography>
        <Typography
          sx={{
            position: "absolute",
            bottom: "5px",
            right: "20px",
            fontSize: "12px",
            color: "gray",
          }}
        >
          Автор: {test.author.username}
        </Typography>
      </Box>
    </Box>
  );
});

export default TestCard;
