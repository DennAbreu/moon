import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// eslint-disable-next-line no-unused-vars
import MoonLogo from "../../assets/MoonLogo.png";
import { Link } from "react-router-dom";

const NavHamburgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack flexDirection={"row"}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Typography variant="h5" color="white">
            Moon.
          </Typography>
          {<MenuIcon />}
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} to={"/"} onClick={handleClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to={"/trade"} onClick={handleClose}>
          Trade
        </MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to={"/signup"} onClick={handleClose}>
          Sign Up
        </MenuItem>
        <MenuItem component={Link} to={"/login"} onClick={handleClose}>
          Log In
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavHamburgerMenu;
