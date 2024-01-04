import React, { useEffect, useState } from "react";
import { Typography, Box, SxProps, TextareaAutosize } from "@mui/material";

interface EditableTypographyProps {
  onChange: (value: string) => void;
  value: string;
  canChange: boolean;
  sx?: SxProps;
}

const EditableTypography = ({ onChange, value, canChange, sx = {} }: EditableTypographyProps): React.ReactElement => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleDoubleClick = (): void => {
    canChange && setEditing(true);
  };

  const handleBlur = (): void => {
    setEditing(false);
    onChange(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  return (
    <Box sx={{ ...(sx || {}) }} onDoubleClick={handleDoubleClick}>
      {editing ? (
        <TextareaAutosize
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid={"input"}
          minRows={1}
          style={{
            width: "100%",
            background: "none",
            outline: "none",
            border: "none",
            resize: "none",
            ...(sx as React.CSSProperties),
          }}
        />
      ) : (
        <Typography data-testid={"text"} sx={{ userSelect: "none", ...sx }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default EditableTypography;
