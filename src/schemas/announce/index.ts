import * as yup from "yup";

export const schemaCreateAnnounce = yup.object().shape({
  year: yup
    .number()
    .required("Year is required.")
    .integer("Year must be an integer.")
    .min(1900, "Year must be at least 1900."),
  km: yup
    .number()
    .required("Kilometers is required.")
    .positive("Kilometers must be a positive value."),
  price_fipe: yup
    .number()
    .required("Fipe price is required.")
    .positive("Fipe price must be a positive value."),
  price: yup
    .number()
    .required("Price is required.")
    .positive("Price must be a positive value."),
  description: yup.string().required("Description is required."),
  image: yup
    .string()
    .required("Image URL is required.")
    .url("Image URL must be a valid URL."),
  withinFipe: yup.boolean(),

  owner: yup.object(),

  mark: yup.string().required("Mark is required."),
  model: yup.string().required("Model is required."),
  fuel: yup.string().required("Fuel type is required."),
  color: yup.string().required("Color is required."),

  gallery: yup.object().shape({
    images: yup.array().of(yup.string().url().required()),
  }),

  comments: yup.array().of(yup.object()),
});

export const schemaUpdateAnnounce = yup.object().shape({
  year: yup
    .number()
    .integer("Year must be an integer.")
    .min(1900, "Year must be at least 1900.")
    .nullable(),
  km: yup.number().positive("Kilometers must be a positive value.").nullable(),
  price_fipe: yup
    .number()
    .positive("Fipe price must be a positive value.")
    .nullable(),
  price: yup.number().positive("Price must be a positive value.").nullable(),
  description: yup.string().nullable(),
  image: yup.string().url("Image URL must be a valid URL.").nullable(),
  withinFipe: yup.boolean().nullable(),

  owner: yup.object().nullable(),

  mark: yup.string().nullable(),
  model: yup.string().nullable(),
  fuel: yup.string().nullable(),
  color: yup.string().nullable(),

  gallery: yup
    .object()
    .shape({
      images: yup.array().of(yup.string().url().required()).nullable(),
    })
    .nullable(),

  comments: yup.array().of(yup.object()).nullable(),

  publishedAt: yup.boolean().required(),
});
