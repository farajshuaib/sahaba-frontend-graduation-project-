import * as yup from "yup";

export const createCollectionSchema = yup.object().shape({
  logo_image: yup.string().required(),
  banner_image: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  website_url: yup.string().url(),
  facebook_url: yup.string().url(),
  twitter_url: yup.string().url(),
  telegram_url: yup.string().url(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(),
});
