import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Formik, ErrorMessage } from "formik";
import { useCrud } from "hooks/useCrud";
import { updateAccountSchema, validateImage } from "services/validations";
import { connectToWallet } from "app/account/actions";
import VerifyAccount from "components/VerifyAccount";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkCapatcha, copyToClipboard } from "utils/functions";
import { useRecaptcha } from "hooks/useRecaptcha";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.account.userData) as UserData;
  const [profileImage, setProfileImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const recaptcha = useRecaptcha();

  const [initFormState, setInitFormState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
    banner_photo: "",
    profile_photo: "",
    facebook_url: "",
    twitter_url: "",
    telegram_url: "",
    website_url: "",
    instagram_url: "",
  });

  const { create } = useCrud("/my-profile");

  useEffect(() => {
    if (userData) {
      setInitFormState({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        banner_photo: userData.banner_photo,
        profile_photo: userData.profile_photo,
        facebook_url: userData.social_links?.facebook_url || "",
        twitter_url: userData.social_links?.twitter_url || "",
        telegram_url: userData.social_links?.telegram_url || "",
        website_url: userData.social_links?.website_url || "",
        instagram_url: userData.social_links?.instagram_url || "",
      });
      setProfileImage(userData?.profile_photo);
      setBannerImage(userData?.banner_photo);
    }
  }, [userData]);

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>{t("My_Account")}</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("Profile_settings")}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {t("Profile_settings_desc")}
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <VerifyAccount
              isVerified={userData?.kyc_form?.status == "approved"}
              fontSize="text-sm md:text-base font-medium"
              sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
            />
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          {initFormState && (
            <Formik
              initialValues={initFormState}
              validationSchema={updateAccountSchema}
              onSubmit={async (values) => {
                if (!recaptcha) {
                  toast.error("Beep-bop, you're a robot!");
                  return;
                }
  
                const token = await checkCapatcha();
  
                if (!token) {
                  toast.error(t("please_verify_you_are_not_a_robot"));
                  return;
                }

                const form = new FormData();
                for (const [key, value] of Object.entries(values)) {
                  form.append(key, value);
                }

                form.append("_method", "put");

                try {
                  await create(form, {
                    "Content-Type": "multipart/form-data",
                  });
                  dispatch(connectToWallet(userData.wallet_address));
                  toast.success(t("Account_successfully_updated"));
                  navigate("/");
                } catch (e: any) {
                  toast.error(
                    e.response?.data?.message || t("Account_update_error")
                  );
                }
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
              }) => (
                <>
                  <div className="w-full mt-5">
                    <div
                      className={`flex relative overflow-hidden justify-center mt-1 border-2 border-dashed ${
                        touched.banner_photo && errors.banner_photo
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
                            <span>{t("Upload_banner_image")}</span>
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
                                setFieldValue("banner_photo", file);
                              }}
                            />
                          </label>
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
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-start flex-shrink-0">
                      <div className="relative flex overflow-hidden rounded-full">
                        <Avatar
                          imgUrl={profileImage || ""}
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

                          <span className="mt-1 text-xs">
                            {t("Change_Image")}
                          </span>
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
                            setProfileImage(URL.createObjectURL(file));
                            setFieldValue("profile_photo", file);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-grow max-w-3xl mt-10 space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">
                      {/* ---- */}
                      <div className="flex items-center w-full gap-3">
                        <div className="flex-grow">
                          <Label htmlFor="first_name">{t("First_name")}</Label>
                          <Input
                            className="mt-1.5"
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={values.first_name}
                            onBlur={handleBlur("first_name")}
                            onChange={handleChange("first_name")}
                          />
                          <ErrorMessage name="first_name" component="p" className="text-sm text-red-600" />
                        </div>
                        <div className="flex-grow">
                          <Label htmlFor="last_name">{t("Last_name")}</Label>
                          <Input
                            className="mt-1.5"
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={values.last_name}
                            onBlur={handleBlur("last_name")}
                            onChange={handleChange("last_name")}
                          />
                          <ErrorMessage name="last_name" component="p" className="text-sm text-red-600" />
                        </div>
                      </div>
                      <div>
                        <Label>{t("Username")}</Label>
                        <Input
                          className="mt-1.5"
                          type="text"
                          id="username"
                          name="username"
                          value={values.username}
                          onBlur={handleBlur("username")}
                          onChange={(e) =>
                            setFieldValue(
                              "username",
                              e.currentTarget.value.trim()
                            )
                          }
                        />
                        <ErrorMessage name="username" component="p" className="text-sm text-red-600"  />
                      </div>

                      {/* ---- */}
                      <div>
                        <Label>{t("Email")}</Label>
                        <div className="mt-1.5 flex">
                          <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                            <i className="text-2xl las la-envelope"></i>
                          </span>
                          <Input
                            className="!rounded-l-none"
                            placeholder="example@email.com"
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange("email")}
                            onBlur={handleBlur("email")}
                          />
                        </div>
                        <ErrorMessage name="email" component="p" className="text-sm text-red-600"  />
                      </div>

                      {/* ---- */}
                      <div>
                        <Label>{t("Bio")}</Label>
                        <Textarea
                          rows={5}
                          className="mt-1.5"
                          value={values.bio}
                          id="bio"
                          name="bio"
                          onChange={handleChange("bio")}
                          onBlur={handleBlur("bio")}
                          placeholder="Something about yourself in a few word."
                        />
                        <ErrorMessage name="bio" component="p" className="text-sm text-red-600"  />
                      </div>

                      {/* ---- */}
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
                        <ErrorMessage name="website_url"  component="p" className="text-sm text-red-600" />
                      </div>

                      {/* ---- */}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
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
                          <ErrorMessage name="facebook_url" component="p" className="text-sm text-red-600" />
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
                          <ErrorMessage name="twitter_url" component="p" className="text-sm text-red-600"  />
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
                          <ErrorMessage name="telegram_url" component="p" className="text-sm text-red-600"  />
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
                          <ErrorMessage name="instagram_url" component="p" className="text-sm text-red-600"  />
                        </div>
                      </div>

                      {/* ---- */}
                      <div>
                        <Label>{t("Wallet_Address")}</Label>
                        <div className="mt-1.5 relative text-neutral-700 dark:text-neutral-300">
                          <Input
                            className="!pr-10 "
                            disabled
                            defaultValue={userData.wallet_address || ""}
                          />

                          <span
                            onClick={() => {
                              copyToClipboard(userData?.wallet_address);
                            }}
                            className="absolute right-2.5 cursor-pointer top-1/2 -translate-y-1/2 "
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="pt-2">
                        <ButtonPrimary
                          loading={isSubmitting}
                          disabled={isSubmitting}
                          className="w-full"
                          onClick={handleSubmit}
                          type="button"
                        >
                          {t("Update_profile")}
                        </ButtonPrimary>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
