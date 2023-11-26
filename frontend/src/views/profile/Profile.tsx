import { Box, Button, Grid } from "@mui/material";
import React from "react";
import HeaderMenu from "../../components/header/HeaderMenu";
import { observer } from "mobx-react";
import UsersStore from "../../store/UsersStore";
import { useFormik } from "formik";
import UsersService from "../../services/users/users.service";
import * as yup from "yup";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import FieldInput from "../../components/field-input/FieldInput";
import { buttonMixin } from "../../utils/styles";

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
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    },
    onSubmit: (values): void => {
      // UsersService.
    },
    validationSchema: userSchema,
  });

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderMenu />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "500px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "600px",
          }}
        >
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
          <FieldInput
            formik={formik}
            type={"email"}
            fieldName={"email"}
            placeholder={"Email"}
            readonly={true}
            style={{ my: "20px" }}
          />
          <Grid container columnSpacing={4}>
            <Grid item xs={6}>
              <FieldInput formik={formik} type={"text"} fieldName={"firstName"} placeholder={"Имя"} />
            </Grid>
            <Grid item xs={6}>
              <FieldInput formik={formik} type={"text"} fieldName={"lastName"} placeholder={"Фамилия"} />
            </Grid>
          </Grid>
          <Button sx={{ ...buttonMixin, width: "100%", marginTop: "20px" }} disabled={formik.isSubmitting}>
            Сохранить
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default Profile;
