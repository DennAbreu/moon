import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(15, "Name must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  confirmEmail: Yup.string()
    .required("Please confirm your email.")
    .oneOf([Yup.ref("email"), null], "Emails do not match!"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});
