import { toast } from "react-toastify";
import * as yup from "yup";

export const createCollectionSchema = yup.object().shape({
  logo_image: yup.mixed().required("File is required"),
  featured_image: yup.mixed(),
  banner_image: yup.mixed(),
  name: yup.string().required("Name is required"),
  slug: yup.string().required("slug is required"),
  description: yup.string(),
  category_id: yup.object().required("Category is required"),
  website_url: yup.string(),
  discord_url: yup.string(),
  instagram_url: yup.string(),
  medium_url: yup.string(),
  telegram_url: yup.string(),
  creator_earnings: yup
    .number()
    .min(0.01, "Minimum earnings 0.01")
    .max(5.0, "Maximum earnings 5.00"),
  blockchain: yup.mixed(),
  is_sensitive_content: yup.boolean(),
  payout_wallet_address: yup
    .string()
    .required("Payout wallet address is required"),
});

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

