import React from "react";
import { render, screen } from "@testing-library/react";
import FieldInput from "./FieldInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";

interface StoreInputProps {
  placeholder?: string;
  label?: string;
  type?: "password" | "text" | "email" | "file";
  readonly?: boolean;
}

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
});

const Container = ({ placeholder, readonly }: StoreInputProps): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: (values): void => {},
    validationSchema: userSchema,
  });
  return <FieldInput formik={formik} fieldName={"username"} placeholder={placeholder} readonly={readonly} />;
};

describe("<FieldInput />", () => {
  it("Компонент рендерится", () => {
    render(<Container placeholder={"Введите Имя"} />);

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите Имя")).toBeInTheDocument();
  });
});
