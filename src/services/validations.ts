import { t } from "i18next";
import { toast } from "react-toastify";
import * as yup from "yup";
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createCollectionSchema = yup.object().shape({
  logo_image: yup
    .mixed()
    .test("fileSize", t("validations.The_file_is_too_large"), (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    })
    .required(),
  banner_image: yup
    .mixed()
    .test("fileSize", t("validations.The_file_is_too_large"), (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    })
    .required(),
  name: yup.string().required(t("validations.name_is_required")).max(255),
  description: yup
    .string()
    .required(t("validations.description_is_required"))
    .max(255),
  facebook_url: yup.string().url(t("validations.url_invalid")).nullable(),
  twitter_url: yup.string().url(t("validations.url_invalid")).nullable(),
  telegram_url: yup.string().url(t("validations.url_invalid")).nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(t("validations.category_is_required")),
});

export const updateCollectionSchema = yup.object().shape({
  name: yup.string().required(t("validations.name_is_required")).max(255),
  description: yup
    .string()
    .required(t("validations.description_is_required"))
    .max(255),
  facebook_url: yup.string().url(t("validations.url_invalid")).nullable(),
  twitter_url: yup.string().url(t("validations.url_invalid")).nullable(),
  telegram_url: yup.string().url(t("validations.url_invalid")).nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(t("validations.category_is_required")),
});

export const createNftSchema = yup.object().shape({
  title: yup.string().required(t("validations.title_is_required")).max(255),
  description: yup
    .string()
    .required(t("validations.description_is_required"))
    .max(255),
  file_path: yup.string().required(t("validations.image_is_required")),
  collection_id: yup.number().required(t("validations.collection_is_required")),
  price: yup
    .number()
    .required(t("validations.price_is_required"))
    .positive(t("validations.price_must_be_more_than_zero"))
    .min(0.01, t("validations.price_is_to_low"))
    .max(5.0, t("validations.price_is_too_high")),
});

export const createPoemNftSchema = yup.object().shape({
  title: yup.string().required(t("validations.title_is_required")).max(255),
  description: yup
    .string()
    .required(t("validations.description_is_required"))
    .max(255),
  collection_id: yup.number().required(t("validations.collection_is_required")),
  price: yup
    .number()
    .required(t("validations.price_is_required"))
    .positive(t("validations.price_must_be_more_than_zero"))
    .min(0.01, t("validations.price_is_to_low"))
    .max(5.0, t("validations.price_is_too_high")),
});

export const updatePriceSchema = yup.object().shape({
  price: yup
    .number()
    .required(t("validations.price_is_required"))
    .positive(t("validations.price_must_be_more_than_zero"))
    .min(0.01, t("validations.price_is_to_low"))
    .max(5.0, t("validations.price_is_too_high")),
});

export const contactSchema = yup.object().shape({
  name: yup.string().required(t("validations.name_is_required")).max(255),
  email: yup.string().email().required(t("validations.email_is_required")),
  subject: yup.string().required(t("validations.subject_is_required")).max(255),
  message: yup.string().required(t("validations.message_is_required")).max(255),
});

export const kycSchema = yup.object().shape({
  gender: yup.string().required(t("validations.genger_is_required")),
  country: yup.string().required(t("validations.country_is_required")),
  city: yup.string().required(t("validations.city_is_required")),
  address: yup.string().required(t("validations.address_is_required")),
  phone_number: yup
    .string()
    .matches(phoneRegExp, t("validations.phone_number_is_invalid"))
    .required(),
  author_type: yup.string().required(t("validations.author_type_is_required")),
  author_art_type: yup
    .string()
    .required(t("validations.author_art_type_is_required")),
  passport_id: yup
    .mixed()
    .test("fileSize", t("validations.The_file_is_too_large"), (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
});

export const updateAccountSchema = yup.object().shape({
  first_name: yup
    .string()
    .required(t("validations.first_name_is_required"))
    .max(255),
  last_name: yup
    .string()
    .required(t("validations.last_name_is_required"))
    .max(255),
  username: yup.string().required(t("validations.username_is_required")).trim(),
  email: yup
    .string()
    .email()
    .required("t(validations.email_is_required)")
    .max(255),
  bio: yup.string().nullable().max(255),
  website_url: yup
    .string()
    .url(t("validations.url_invalid"))
    .nullable()
    .max(255),
  facebook_url: yup
    .string()
    .url(t("validations.url_invalid"))
    .nullable()
    .max(255),
  twitter_url: yup
    .string()
    .url(t("validations.url_invalid"))
    .nullable()
    .max(255),
  telegram_url: yup
    .string()
    .url(t("validations.url_invalid"))
    .nullable()
    .max(255),
  instagram_url: yup
    .string()
    .url(t("validations.url_invalid"))
    .nullable()
    .max(255),
  banner_photo: yup
    .mixed()
    .test("fileSize", t("validations.The_file_is_too_large"), (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
  profile_photo: yup
    .mixed()
    .test("fileSize", t("validations.The_file_is_too_large"), (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
});

export const validateImage = (file: any) => {
  const fileType = file?.type;
  const fileSize = file?.size;
  const validImageTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg",
    "image/webp",
    "image/svg+xml",
  ];
  if (!validImageTypes.includes(fileType)) {
    toast.error(`${t("validations.The_file_must_be_an_image")}`);
    return false;
  }
  if (fileSize > 100000024) {
    toast.error(`${t("validations.The_file_is_too_large")}`);
    return false;
  }
  return true;
};
