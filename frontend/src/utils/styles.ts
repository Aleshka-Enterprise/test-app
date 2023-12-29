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
  borderRadius: "3px",
  float: "right",
  border: "solid 1px #32373d",
  "&:hover": {
    background: "#00040a",
  },
};

export const linkMixin: SxProps = {
  color: "blue",
  fontSize: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: "purple",
  },
};

export const cardMixin: SxProps = {
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
};
