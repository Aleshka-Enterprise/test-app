import React, { useEffect } from "react";
import FieldInput from "../../components/field-input/FieldInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import * as yup from "yup";
import UsersService from "../../services/users/users.service";
import TasksParticles from "../../components/particles/Particles";
import { Box, Button, Typography } from "@mui/material";
import { buttonMixin, linkMixin } from "../../utils/styles";

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
  email: yup.string().email().required(REQUIRED_FIELD_ERROR),
  repeatPassword: yup.string().required(REQUIRED_FIELD_ERROR),
  firstName: yup.string().required(REQUIRED_FIELD_ERROR),
  lastName: yup.string().required(REQUIRED_FIELD_ERROR),
});

/**
 * Регистрация
 */
const Registration = (): React.ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      repeatPassword: "",
    },
    onSubmit: (values): void => {
      if (values.password !== values.repeatPassword) {
        formik.setErrors({ password: "Пароли должны совпадать", repeatPassword: "Пароли должны совпадать" });
        formik.setSubmitting(false);
      } else {
        UsersService.registration(values).then(() => navigate("/autorization/"));
      }
    },
    validationSchema: userSchema,
  });

  useEffect(() => {
    const { password, repeatPassword } = formik.errors;
    formik.setErrors({
      ...formik.errors,
      password: password !== REQUIRED_FIELD_ERROR ? undefined : password,
      repeatPassword: repeatPassword !== REQUIRED_FIELD_ERROR ? undefined : repeatPassword,
    });
  }, [formik.values.password, formik.values.repeatPassword]);

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
          marginTop: "12%",
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
          Регистрация
        </Box>
        <FieldInput formik={formik} fieldName={"username"} placeholder={"Имя пользователя"} />
        <Box sx={{ width: "100%", marginTop: "30px" }}>
          <FieldInput formik={formik} type={"email"} fieldName={"email"} placeholder={"Email"} />
        </Box>
        <Box sx={{ width: "100%", marginTop: "30px" }}>
          <FieldInput formik={formik} type={"password"} fieldName={"password"} placeholder={"Введите пароль"} />
        </Box>
        <Box sx={{ width: "100%", marginTop: "30px" }}>
          <FieldInput formik={formik} type={"password"} fieldName={"repeatPassword"} placeholder={"Повторите пароль"} />
        </Box>
        <Box sx={{ width: "100%", marginTop: "30px", display: "flex", gap: "25px" }}>
          <Box>
            <FieldInput formik={formik} type={"text"} fieldName={"firstName"} placeholder={"Имя"} />
          </Box>
          <Box>
            <FieldInput formik={formik} type={"text"} fieldName={"lastName"} placeholder={"Фамилия"} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
          <Typography sx={linkMixin} onClick={(): void => navigate("/autorization/")}>
            Уже есть аккаунт?
          </Typography>
          <Button
            onClick={(): void => {
              formik.submitForm();
            }}
            sx={buttonMixin}
            disabled={formik.isSubmitting}
            data-testid={"btn"}
          >
            Регистрация
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
