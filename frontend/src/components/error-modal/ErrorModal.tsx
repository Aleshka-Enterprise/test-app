import { observer } from "mobx-react-lite";
import React from "react";
import ModalWindowsStore from "../../store/ModalWindowsStore";
import { Box } from "@mui/system";
import { Button, Modal, Typography } from "@mui/material";
import { buttonMixin } from "../../utils/styles";

import "font-awesome/css/font-awesome.min.css";

const ErrorModal = observer((): React.ReactElement => {
  const closeModal = (): void => {
    ModalWindowsStore.errorMessage = undefined;
  };

  return (
    <Modal
      open={!!ModalWindowsStore.errorMessage}
      sx={{ top: "calc(50% - 100px)", left: "calc(50% - 300px)" }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <Box
        data-testid='error-modal'
        sx={{ background: "white", width: "600px", height: "200px", position: "relative" }}
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
          <Typography sx={{ display: "flex", alignItems: "center" }}>Внимание!</Typography>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={closeModal}>
            <i className='fa fa-times' aria-hidden='true'></i>
          </Box>
        </Box>
        <Box
          sx={{ padding: "30px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px" }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ModalWindowsStore.errorMessage}</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <Button sx={{ ...buttonMixin }} onClick={closeModal}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default ErrorModal;
