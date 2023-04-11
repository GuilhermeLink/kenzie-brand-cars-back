import * as yup from "yup";

export const schemaCreateAnnounce: any = yup.object().shape({
  title: yup.string().required(),
});
