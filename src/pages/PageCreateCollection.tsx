import Label from "components/Label/Label";
import { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import MySwitch from "components/MySwitch";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import { Formik, ErrorMessage } from "formik";
import { useCrud } from "hooks/useCrud";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Avatar from "shared/Avatar/Avatar";
import {
  createCollectionSchema,
  validateImage,
  updateCollectionSchema,
} from "services/validations";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollections } from "app/general/actions";
import { useTranslation } from "react-i18next";
import { useApi } from "hooks/useApi";

export interface PageCreateCollectionProps {
  className?: string;
}

const PageCreateCollection: FC<PageCreateCollectionProps> = ({
  className = "",
}) => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const api = useApi();
  const categories = useAppSelector((state) => state.general.categories);
  const { create, fetchById, item } = useCrud("/collections");
  const [bannerImage, setBannerImage] = useState<string>("");
  const [logoImage, setLogoImage] = useState<string>("");

  const [initFormState, setInitFormState] = useState({
    logo_image: null,
    banner_image: null,
    name: "",
    description: "",
    facebook_url: "",
    twitter_url: "",
    telegram_url: "",
    website_url: "",
    instagram_url: "",
    is_sensitive_content: false,
    category_id: null,
  });

  useEffect(() => {
    if (params.id) fetchById(params.id);
  }, []);

  useEffect(() => {
    if (item) {
      setInitFormState({
        ...item,
        logo_image: "",
        banner_image: "",
        facebook_url: item.facebook_url || "",
        twitter_url: item.twitter_url || "",
        telegram_url: item.telegram_url || "",
        website_url: item.website_url || "",
        instagram_url: item.instagram_url || "",
        category_id: item.category.id,
      });
      setLogoImage(item?.logo_image);
      setBannerImage(item?.banner_image);
    }
  }, [item]);

  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>
          {params.id ? t("edit_collection") : t("Create_Collection")}
        </title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {params.id ? t("edit_collection") : t("Create_Collection")}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {t("Create_Collection_desc")}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <Formik
            initialValues={initFormState}
            validationSchema={
              params.id ? updateCollectionSchema : createCollectionSchema
            }
            enableReinitialize
            onSubmit={async (values) => {
              try {
                const form:any = new FormData();
                for (const [key, value] of Object.entries(values)) {
                  form.append(key, value);
                }

                if (params.id) {
                  form.append("_method", "put");
                  await api.post(`/collections/${params.id}`, form, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  toast.success(t("collection_updated_successfully"));
                } else {
                  await create(form, {
                    "Content-Type": "multipart/form-data",
                  });
                  toast.success(t("collection_created_successfully"));
                }

                dispatch(getCollections());

                navigate(-1);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              handleReset,
            }) => (
              <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                {/* cover image */}
                <div>
                  <h3 className="text-lg font-semibold sm:text-2xl">
                    {t("cover_image")}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("supported_files")}
                  </span>
                  <div className="mt-5 ">
                    <div
                      className={`flex relative overflow-hidden justify-center mt-1 border-2 border-dashed ${
                        touched.banner_image && errors.banner_image
                          ? "border-red-600"
                          : "border-neutral-300 dark:border-neutral-6000"
                      } rounded-xl`}
                    >
                      <div
                        className={`relative inset-0 z-20 flex flex-col items-center justify-center w-full h-full px-6 pt-5 pb-6 space-y-1 text-center  cursor-pointer text-neutral-50 ${
                          bannerImage && "bg-black  bg-opacity-60"
                        }`}
                      >
                        <svg
                          className="w-12 h-12 mx-auto text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium rounded-md cursor-pointer text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>{t("Upload_image")}</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={async (e) => {
                                if (!e.target.files) return;
                                const file = e.target.files[0];
                                if (!validateImage(file)) return;
                                setBannerImage(URL.createObjectURL(file));
                                setFieldValue("banner_image", file);
                              }}
                            />
                          </label>
                          <p className="pl-1">{t("or_drag_and_drop")}</p>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {t("extensions_sizes")}
                        </p>
                      </div>
                      {bannerImage && (
                        <img
                          className={`absolute z-10 inset-0 w-full h-full object-cover `}
                          src={bannerImage}
                          alt={"collection banner image"}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* logo image  */}
                <div className="flex items-start flex-shrink-0">
                  <div className="relative flex mx-auto overflow-hidden rounded-full">
                    <Avatar
                      imgUrl={logoImage || ""}
                      containerClassName={`${
                        touched.logo_image &&
                        errors.logo_image &&
                        "border-2 border-red-600"
                      }`}
                      sizeClass="w-32 h-32"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-40 text-neutral-50">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="mt-1 text-xs">{t("Logo_Image")}</span>
                    </div>
                    <input
                      type="file"
                      aria-label="upload-image"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        if (!validateImage(file)) return;
                        setLogoImage(URL.createObjectURL(file));
                        setFieldValue("logo_image", file);
                      }}
                    />
                  </div>
                </div>

                {/* ---- */}
                <FormItem htmlFor="name" label={t("Collection_Name")}>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  <ErrorMessage name="name" className="text-sm text-red-600" />
                </FormItem>

                {/* ---- */}
                <FormItem
                  label={t("Description")}
                  htmlFor="description"
                  desc={
                    <div>
                      {t("Collection_Description_desc")}
                      <span className="text-green-500">
                        {t("Markdown")}
                      </span>{" "}
                      {t("syntax_is_supported")}
                    </div>
                  }
                >
                  <Textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    rows={6}
                    className="mt-1.5"
                    placeholder="..."
                  />
                  <ErrorMessage
                    name="description"
                    className="text-sm text-red-600"
                  />
                </FormItem>

                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                {/* categories */}
                <div>
                  <Label>{t("Choose_category")}</Label>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Choose_a_category")}
                  </div>
                  <RadioGroup
                    value={categories?.find(
                      (cat: Category) => cat.id == values.category_id
                    )}
                    onChange={(value: Category) => {
                      setFieldValue("category_id", value.id);
                    }}
                  >
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="flex py-2 space-x-4 overflow-auto customScrollBar">
                      {categories &&
                        categories.map((category: Category, index: number) => (
                          <RadioGroup.Option
                            key={index}
                            value={category}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                  : ""
                              }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <div className="flex items-center justify-between">
                                        <RadioGroup.Description
                                          as="div"
                                          className={"rounded-full w-16"}
                                        >
                                          <NcImage
                                            containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                            src={category.icon}
                                          />
                                        </RadioGroup.Description>
                                        {checked && (
                                          <div className="flex-shrink-0 text-white">
                                            <CheckIcon className="w-6 h-6" />
                                          </div>
                                        )}
                                      </div>
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-semibold mt-3  ${
                                          checked ? "text-white" : ""
                                        }`}
                                      >
                                        {category.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                  <ErrorMessage
                    name="category_id"
                    className="text-sm text-red-600"
                  />
                </div>

                <div className="">
                  <Label>{t("Website")}</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      https://
                    </span>
                    <Input
                      className="!rounded-l-none"
                      value={values.website_url}
                      type="url"
                      id="website_url"
                      name="website_url"
                      onChange={handleChange("website_url")}
                      onBlur={handleBlur("website_url")}
                      placeholder="your website.com"
                    />
                  </div>
                  <ErrorMessage name="website_url" />
                </div>

                {/* ---- */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 sm:gap-2.5">
                  <div>
                    <Label>{t("Facebook")}</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-facebook-f"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        placeholder={t("your_facebook_account_url")}
                        value={values.facebook_url}
                        type="url"
                        id="facebook_url"
                        name="facebook_url"
                        onBlur={handleBlur("facebook_url")}
                        onChange={handleChange("facebook_url")}
                        sizeClass="h-11 px-4 pl-2 pr-3"
                      />
                    </div>
                    <ErrorMessage name="facebook_url" />
                  </div>
                  <div>
                    <Label>{t("Twitter")}</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-twitter"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        placeholder={t("your_twitter_account_url")}
                        value={values.twitter_url}
                        type="url"
                        id="twitter_url"
                        name="twitter_url"
                        onChange={handleChange("twitter_url")}
                        onBlur={handleBlur("twitter_url")}
                        sizeClass="h-11 px-4 pl-2 pr-3"
                      />
                    </div>
                    <ErrorMessage name="twitter_url" />
                  </div>
                  <div>
                    <Label>{t("Telegram")}</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-telegram"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        placeholder={t("your_telegram_account_url")}
                        value={values.telegram_url}
                        type="url"
                        id="telegram_url"
                        name="telegram_url"
                        onChange={handleChange("telegram_url")}
                        onBlur={handleBlur("telegram_url")}
                        sizeClass="h-11 px-4 pl-2 pr-3"
                      />
                    </div>
                    <ErrorMessage name="telegram_url" />
                  </div>
                  <div>
                    <Label>{t("Instagram")}</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-telegram-plane"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        placeholder={t("your_instagram_account_url")}
                        value={values.instagram_url}
                        type="url"
                        id="instagram_url"
                        name="instagram_url"
                        onChange={handleChange("instagram_url")}
                        onBlur={handleBlur("instagram_url")}
                        sizeClass="h-11 px-4 pl-2 pr-3"
                      />
                    </div>
                    <ErrorMessage name="instagram_url" />
                  </div>
                </div>

                {/* ---- */}
                <MySwitch
                  label={t("is_sensitive_content")}
                  enabled={values.is_sensitive_content}
                  onChange={(val: boolean) =>
                    setFieldValue("is_sensitive_content", val)
                  }
                  desc={t("is_sensitive_content_desc")}
                />

                {/* ---- */}
                <div className="flex flex-col pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ">
                  <ButtonPrimary
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    {t("submit")}
                  </ButtonPrimary>
                  <ButtonSecondary
                    onClick={() => {
                      if (params.id) {
                        navigate(-1);
                      } else {
                        handleReset();
                      }
                    }}
                    className="flex-1"
                  >
                    {t("Cancel")}
                  </ButtonSecondary>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PageCreateCollection;
