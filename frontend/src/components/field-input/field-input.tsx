import React from "react";
import { FormikProps } from "formik";
import { getFieldProps } from "../../utils/formik-fields";

import "./field-input.scss";

interface StoreInputProps {
  formik: FormikProps<any>;
  fieldName: string;
  placeholder?: string;
  label?: string;
  type?: "password" | "text" | "email" | "file";
  readonly?: boolean;
}

/**
 * Кастомное поле ввода для форм
 */
const FieldInput = ({
  formik,
  fieldName,
  label,
  placeholder,
  type = "text",
  readonly = false,
}: StoreInputProps): React.ReactElement => {
  const formikProps = getFieldProps(formik, fieldName);
  const value = formik.values[fieldName];

  return (
    <div className={`store-input ${readonly ? "readonly" : ""}`}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      {type !== "file" ? (
        <input
          onChange={formikProps.onChange}
          name={formikProps.name as string}
          placeholder={placeholder}
          type={type}
          readOnly={readonly}
          value={value || ""}
          className={formik.touched[fieldName] && formik.errors[fieldName] ? "error" : ""}
          data-testid={fieldName}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (event.key === "Enter") {
              formik.submitForm();
            }
          }}
        />
      ) : (
        <div className='input'>
          {typeof value === "string" ? value : value?.name || ""}
          <label className='custom-file-upload'>
            <input
              type='file'
              data-testid={fieldName}
              name={formikProps.name as string}
              onChange={(e): void => {
                formik.setFieldValue(fieldName, e.target.files?.[0]);
              }}
            />
            Browse
          </label>
        </div>
      )}
    </div>
  );
};

export default FieldInput;
