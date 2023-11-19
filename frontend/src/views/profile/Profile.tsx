import { Box } from "@mui/material";
import React from "react";
import HeaderMenu from "../../components/header/HeaderMenu";
import { observer } from "mobx-react";
import UsersStore from "../../store/UsersStore";
import { useFormik } from "formik";
import UsersService from "../../services/users/users.service";
import * as yup from "yup";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import FieldInput from "../../components/field-input/FieldInput";

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
});

/**
 * Профиль
 */
const Profile = observer((): React.ReactElement => {
  const currentUser = UsersStore.user;
  const formik = useFormik({
    initialValues: {
      username: currentUser?.username,
    },
    onSubmit: (values): void => {},
    validationSchema: userSchema,
  });

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderMenu />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "500px", marginTop: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={currentUser?.img ? UsersService.getImgUrl(currentUser?.img as string) : ""}
            />
          </Box>
          <FieldInput formik={formik} type={"text"} fieldName={"username"} placeholder={"Имя пользователя"} />
        </Box>
      </Box>
    </Box>
  );
});

export default Profile;
