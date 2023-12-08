import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UsersStore from "../../store/UsersStore";
import UsersService from "../../services/users/users.service";
import { Box, Typography } from "@mui/material";

import "font-awesome/css/font-awesome.min.css";

const elemMixin = {
  cursor: "pointer",
  ".fa": {
    marginLeft: "5px",
  },
  "&.elem:hover": {
    color: "white",
  },
};

const menuOptionMixim = {
  cursor: "pointer",
  padding: "5px",
  "&:hover": { color: "white" },
};

const HeaderMenu = observer((): React.ReactElement => {
  const [isMenuDisplayed, setMenuDisplayed] = useState<boolean>(false);
  const navigate = useNavigate();

  const dropdownMenu = (): React.ReactElement => {
    return (
      <Box
        sx={{
          position: "absolute",
          background: "#343a40",
          zIndex: 1000,
          width: "150px",
          color: "rgba(255,255,255,.5) !important",
          top: "20px",
        }}
      >
        <Typography sx={menuOptionMixim} onClick={(): void => navigate("/profile/", { replace: true })}>
          Профиль
        </Typography>
        <Typography sx={menuOptionMixim} onClick={(): void => navigate("/users_tests/", { replace: true })}>
          Мои тесты
        </Typography>
        {(UsersStore.user?.isStaff || UsersStore.user?.isSuperuser) && (
          <Typography sx={menuOptionMixim}>Админ-панель</Typography>
        )}
        <Box sx={{ borderBottom: "solid 1px gray" }} />
        <Typography
          sx={menuOptionMixim}
          onClick={(): void => {
            UsersService.logout().then(() => {
              navigate("/");
            });
          }}
        >
          Выйти
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ widt: "100%", background: "#343a40", height: "56px", px: "360px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", height: "100%", alignItems: "center" }}>
        <Box sx={{ color: "white", fontSize: 24, cursor: "pointer" }} onClick={(): void => navigate("/")}>
          Test app
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px", color: "rgba(255,255,255,.5)" }}>
          {!UsersStore.user && (
            <Box sx={elemMixin} className={"elem"} onClick={(): void => navigate("/autorization/")}>
              Войти
              <i className='fa fa-sign-in' aria-hidden='true'></i>
            </Box>
          )}
          {UsersStore.user && (
            <Box
              data-testid={"menuIcon"}
              sx={{ ...elemMixin, position: "relative", color: isMenuDisplayed ? "white" : "rgba(255,255,255,.5)" }}
              className={"elem"}
              onClick={(): void => setMenuDisplayed(!isMenuDisplayed)}
            >
              <i className='fa fa-user-circle elem' aria-hidden='true'></i>
              {isMenuDisplayed && dropdownMenu()}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default HeaderMenu;
