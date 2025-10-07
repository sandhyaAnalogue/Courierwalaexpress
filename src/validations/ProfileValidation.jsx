import * as Yup from "yup";

export const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email"),
  dob: Yup.string()
    // .required("Date of Birth is required")
    .matches(
      /^\d{2}-\d{2}-\d{4}$/,
      "Date of Birth must be in dd-mm-yyyy format"
    ),
  gender: Yup.string(),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
});
