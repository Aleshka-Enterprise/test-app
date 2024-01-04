import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";

interface DropDownProps {
  options: { title: string; id: number }[];
  name: string;
  onOptionSelect: (value?: { title: string; id: number }) => void;
  selectedOptionId?: number;
}

const DropDown = ({ options, name, onOptionSelect, selectedOptionId }: DropDownProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id='demo-positioned-button'
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-testid='btn'
      >
        {name}
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options.map(option => {
          return (
            <MenuItem
              onClick={(): void => {
                onOptionSelect(option.id !== 0 ? option : undefined);
                handleClose();
              }}
              key={option.id}
              sx={{ color: selectedOptionId === option.id ? "red" : "blue" }}
              data-testid='option'
            >
              {option.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DropDown;
