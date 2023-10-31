import React from "react";
import FieldInput from "../../components/field-input/field-input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import * as yup from "yup";
import UsersService from "../../services/users/users.service";
import TasksParticles from "../../components/particles/particles";


const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
});

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
        // UsersService.getCurrentUser();
      })
      .catch(() => {
        console.log({ title: "Ошибка", description: "Не верный логин или пароль!" });
        formik.setSubmitting(false);
      });
    },
    validationSchema: userSchema,
  });

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
      <TasksParticles />
      <div style={{ width: "400px", height: "70%", backgroundColor: "white", borderRadius: "10px", padding: "20px 50px", marginTop: "13%" }}>
        <FieldInput
          formik={formik}
          fieldName={"username"}
          label={"Имя пользователя"}
          placeholder={"Введите имя пользователя"}
        />
        <FieldInput
          formik={formik}
          fieldName={"password"}
          label={"Пароль"}
          placeholder={"Введите пароль"}
        />
        <button
          onClick={() => formik.submitForm()}
          style={{
            cursor: "pointer",
            color: "#ffffff",
            backgroundColor: "#32373d",
            alignItems: "center",
            transition: "0.3s",
            height: "30px",
            marginTop: "20px",
            borderRadius: "3px",
            float: "right",
          }}
        >
          Авторизоваться
        </button>
      </div>
    </div> 
  );
};

export default Autorization;
