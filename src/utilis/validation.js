import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registerUser = yup.object({
  name: yup.string().typeError("First name is a required field").required(),
  email: yup.string().notRequired(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
  collegeORunit: yup.string().required(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const profileSchema = yup.object({
  name: yup.string().typeError("First name is a required field").required(),
  email: yup.string().notRequired(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
});

export const changePasswordSchema = yup.object({
  oldPass: yup.string().required(),
  newPass: yup.string().required(),
  confPass: yup.string().required(),
});

export const addUserSchema = yup.object({
  name: yup.string().typeError("First name is a required field").required(),
  email: yup.string().notRequired(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
  collegeORunit: yup.string().required(),

  created_by: yup.number().required(),
});

export const addMeetingSchema = yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  location: yup.string().required(),
});

export const editMeetingSchema = yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  location: yup.string().required(),
});

export const guestSchema = yup.object({
  name: yup.string().required(),
  topic: yup.string().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
  church_from: yup.string().required(),
  created_by: yup.number().required(),
});
