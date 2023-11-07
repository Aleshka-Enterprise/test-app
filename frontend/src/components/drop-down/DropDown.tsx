import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";

interface DropDownProps {
  options: { title: string; id: number }[];
  name: string;
  onOptionSelect: (valye?: { title: string; id: number }) => void;
  selectedOptionId?: number;
};

const DropDown = ({ options, name, onOptionSelect, selectedOptionId }: DropDownProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options.map(option => {
          return (
            <MenuItem
              onClick={() => {
                onOptionSelect(option.id !== 0 ? option : undefined);
                handleClose();
              }}
              key={option.id}
              sx={{ color: selectedOptionId === option.id ? "red" : "blue" }}
            >
              {option.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

export default DropDown;
