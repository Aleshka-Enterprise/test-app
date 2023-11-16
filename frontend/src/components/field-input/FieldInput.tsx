import React from "react";
import { FormikProps } from "formik";
import { getFieldProps } from "../../utils/formik-fields";
import { Box, Input, Typography } from "@mui/material";

interface StoreInputProps<T> {
  formik: FormikProps<T>;
  fieldName: keyof T;
  placeholder?: string;
  label?: string;
  type?: "password" | "text" | "email" | "file";
  readonly?: boolean;
}

/**
 * Кастомное поле ввода для форм
 */
function FieldInput<T>({
  formik,
  fieldName,
  label,
  placeholder,
  type = "text",
  readonly = false,
}: StoreInputProps<T>): React.ReactElement {
  const formikProps = getFieldProps(formik, fieldName);
  const value = formik.values[fieldName];
  const showError = (formik.touched[fieldName] && formik.errors[fieldName]) || formik.isSubmitting;

  return (
    <Box>
      {type !== "file" ? (
        <Box sx={{ width: "100% !important" }}>
          <Input
            onChange={formikProps.onChange}
            name={formikProps.name as string}
            placeholder={placeholder}
            type={type}
            readOnly={readonly}
            value={value || ""}
            data-testid={fieldName}
            disabled={readonly}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === "Enter") {
                formik.submitForm();
              }
            }}
            sx={{ width: "100% !important" }}
          />
          <Typography sx={{ color: "red", height: "10px", fontSize: "10px" }}>
            {showError ? (formik.errors[fieldName] as string) : ""}
          </Typography>
        </Box>
      ) : (
        <Box className='input'>
          <label className='custom-file-upload'>
            <input
              type='file'
              data-testid={fieldName}
              name={formikProps.name as string}
              onChange={(e): void => {
                formik.setFieldValue(fieldName as string, e.target.files?.[0]);
              }}
            />
            Browse
          </label>
        </Box>
      )}
    </Box>
  );
}

export default FieldInput;
