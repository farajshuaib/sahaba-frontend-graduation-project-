import { toast } from 'react-toastify';
import * as yup from "yup";

export const createCollectionSchema = yup.object().shape({
  logo_image: yup.string().required(),
  banner_image: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  facebook_url: yup.string().url(),
  twitter_url: yup.string().url(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(),
});

export const createNftSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  file_path: yup.string().required(),
  file_type: yup.string().required(),
  collection_id: yup.number().required(),
  price: yup.number().required().positive().min(0.01).max(5.0),
});

export const updatePriceSchema = yup.object().shape({
  price: yup.number().required().positive().min(0.01).max(5.0),
})

export const validateImage = (file: any) => {
  const fileType = file.type;
  const fileSize = file.size;
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
    toast.error(
      "invalid file type, make sure you are uploading an image|jpeg,png,jpg,gif,svg,webp"
    );
    return false;
  }
  if (fileSize > 100000024) {
    toast.error("your image is too large, make sure it is less than 10MB");
    return false;
  }
  return true;
};
