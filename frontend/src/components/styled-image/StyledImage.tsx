import styled from "@emotion/styled";

interface StyledImageProps {
  editable?: boolean;
}

const StyledImage = styled("img")(({ editable }: StyledImageProps) => ({
  width: "200px",
  height: "200px",
  objectFit: "cover",
  borderRadius: "50%",
  margin: "0 auto",
  display: "flex",
  transition: "0.3s",
  "&:hover": {
    cursor: "pointer",
    opacity: editable ? 0.5 : 1,
  },
}));

export default StyledImage;
