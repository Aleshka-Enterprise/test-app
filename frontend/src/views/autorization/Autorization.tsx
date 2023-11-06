import React from "react";
import FieldInput from "../../components/field-input/field-input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import * as yup from "yup";
import UsersService from "../../services/users/users.service";
import TasksParticles from "../../components/particles/particles";
import { Box, Button } from "@mui/material";


const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
});

/**
 * Авторизация
 */
const Autorization = (): React.ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values): void => {
      UsersService.autorization(values)
      .then((): void => {
        navigate("/");
        UsersService.getCurrentUser();
      })
      .catch(() => {
        console.log({ title: "Ошибка", description: "Не верный логин или пароль!" });
        formik.setSubmitting(false);
      });
    },
    validationSchema: userSchema,
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
      <TasksParticles />
      <Box sx={{ width: "400px", height: "70%", backgroundColor: "white", borderRadius: "10px", padding: "20px 50px", marginTop: "15%" }}>
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
        <FieldInput
          formik={formik}
          fieldName={"username"}
          label={"Имя пользователя"}
          placeholder={"Введите имя пользователя"}
        />
        <Box sx={{ width: "100%", marginTop: "15px" }}>
          <FieldInput
            formik={formik}
            fieldName={"password"}
            label={"Пароль"}
            placeholder={"Введите пароль"}
          />
        </Box>
        <Button
          onClick={() => formik.submitForm()}
          sx={{
            cursor: "pointer",
            color: "#ffffff",
            backgroundColor: "#32373d",
            alignItems: "center",
            transition: "0.3s",
            height: "40px",
            marginTop: "30px",
            borderRadius: "3px",
            float: "right",
            border: "solid 1px #32373d",
            "&:hover": {
              background: "#00040a",
            }
          }}
        >
          Авторизоваться
        </Button>
      </Box>
    </Box> 
  );
};

export default Autorization;
