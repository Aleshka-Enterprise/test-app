import React from "react";
import FieldInput from "../../components/field-input/FieldInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import * as yup from "yup";
import UsersService from "../../services/users/users.service";
import TasksParticles from "../../components/particles/Particles";
import { Box, Button, Typography } from "@mui/material";
import { buttonMixin, linkMixin } from "../../utils/styles";
import ModalWindowsStore from "../../store/ModalWindowsStore";
import { IError } from "../../models/common";
import { AxiosError } from "axios";

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
});

/**
 * Авторизация
 */
const Authorization = (): React.ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values): void => {
      UsersService.authorization(values)
        .then((): void => {
          navigate("/");
          UsersService.getCurrentUser();
        })
        .catch((error: AxiosError<IError>) => {
          if (error.response?.data?.errorMessage) {
            ModalWindowsStore.errorMessage = error.response.data.errorMessage;
          }
          formik.setSubmitting(false);
        });
    },
    validationSchema: userSchema,
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
      <TasksParticles />
      <Box
        sx={{
          width: "400px",
          height: "70%",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px 50px",
          marginTop: "15%",
        }}
      >
        <Box
          sx={{
            fontSize: "38px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            color: "#212529",
            margin: "0 66% 20px auto",
            width: "50px",
          }}
        >
          Авторизация
        </Box>
        <FieldInput formik={formik} fieldName={"username"} placeholder={"Введите имя пользователя"} />
        <Box sx={{ width: "100%", marginTop: "30px" }}>
          <FieldInput formik={formik} type={"password"} fieldName={"password"} placeholder={"Введите пароль"} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
          <Typography sx={linkMixin} onClick={(): void => navigate("/registration/")}>
            Нужен аккаунт?
          </Typography>
          <Button
            onClick={(): void => {
              formik.submitForm();
            }}
            sx={buttonMixin}
            disabled={formik.isSubmitting}
          >
            Авторизоваться
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Authorization;
