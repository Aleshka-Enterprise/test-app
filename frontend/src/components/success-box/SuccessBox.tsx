import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import ModalWindowsStore from "../../store/ModalWindowsStore";

const SuccessBox = observer((): React.ReactElement => {
  const closeModal = (): void => {
    ModalWindowsStore.successMessage = undefined;
  };

  useEffect(() => {
    if (ModalWindowsStore.successMessage) {
      setTimeout(() => {
        closeModal();
      }, 5000);
    }
  }, [ModalWindowsStore.successMessage]);

  return (
    <Box
      data-testid='success-box'
      sx={{
        background: "white",
        width: "300px",
        height: "100px",
        position: "absolute",
        bottom: "15px",
        right: "15px",
        display: ModalWindowsStore.successMessage ? "block" : "none",
        transition: "0.5s",
      }}
    >
      <Box
        sx={{
          height: "30px",
          background: "#32373d",
          px: "10px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ display: "flex", alignItems: "center" }}>Успех</Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          data-testid={"close"}
          onClick={closeModal}
        >
          <i className='fa fa-times' aria-hidden='true'></i>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px" }}>
        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{ModalWindowsStore.successMessage}</Typography>
      </Box>
    </Box>
  );
});

export default SuccessBox;
