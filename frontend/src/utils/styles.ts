import { SxProps } from "@mui/material";

export const headerMixin: SxProps = {
  fontSize: "18px",
};

export const buttonMixin: SxProps = {
  cursor: "pointer",
  color: "#ffffff",
  backgroundColor: "#32373d",
  alignItems: "center",
  transition: "0.3s",
  height: "40px",
  marginTop: "30px",
  borderRadius: "3px",
  float: "right",
  border: "solid 1px #32373d",
  "&:hover": {
    background: "#00040a",
  },
};
