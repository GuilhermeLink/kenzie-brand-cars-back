import * as yup from "yup";

export const schemaCreateAccount = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  cpf: yup
    .string()
    .min(11, "CPF must be 11 characters")
    .max(11, "CPF must be 11 characters")
    .required("CPF is required"),
  phone: yup
    .string()
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
  birthDate: yup.date().required("Birthdate is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  type: yup
    .string()
    .required("Type is required")
    .oneOf(["buyer", "seller"], "Type must be either 'buyer' or 'seller'"),
  admin: yup.boolean(),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    number: yup
      .number()
      .positive("Number must be a positive value")
      .required("Number is required"),
    complement: yup.string().required("Complement is required"),
    neighborhood: yup.string().required("Neighborhood is required"),
    city: yup.string().required("City is required"),
    state: yup
      .string()
      .length(2, "State must be 2 characters")
      .required("State is required"),
    zipCode: yup
      .string()
      .length(5, "Zip code must be 5 characters")
      .required("Zip code is required"),
  }),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
