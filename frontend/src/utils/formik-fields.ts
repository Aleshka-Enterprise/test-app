import React from "react";
import { FormikErrors, FormikTouched } from "formik";

type FieldProps<T, K extends keyof T> = {
  name: K;
  value: T[K] | string;
  error: boolean;
  helperText: string | FormikErrors<T>[keyof T];
  onChange: (e: React.ChangeEvent<unknown>) => void;
  onBlur?: (e: React.FocusEvent<unknown>) => void;
};

type FuncType = <T>(
  formikInstance: {
    initialValues: T;
    errors: FormikErrors<T>;
    touched: FormikTouched<T>;
    values: T;
    submitCount: number;
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur?: (e: React.FocusEvent<unknown>) => void;
  },
  key: keyof T,
  showFordedError?: boolean
) => FieldProps<T, keyof T>;

export const getFieldProps: FuncType = (formik, key, showForcedError) => ({
  name: key,
  value: formik.values[key] || "",
  error: (formik.touched[key] || !!formik.submitCount || !!showForcedError) && !!formik.errors[key],
  helperText: formik.touched[key] || !!formik.submitCount || !!showForcedError ? formik.errors[key] : "",
  onChange: formik.handleChange,
  onBlur: formik.handleBlur,
});
