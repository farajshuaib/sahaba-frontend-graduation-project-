import React, { useEffect, useRef, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ErrorMessage, Formik } from "formik";
import { useApi } from "hooks/useApi";
import { toast } from "react-toastify";
import { useAppSelector } from "app/hooks";
import Select from "shared/Select/Select";
import countries from "data/countries";
import Radio from "shared/Radio/Radio";
import { kycSchema } from "services/validations";
import { useTranslation } from "react-i18next";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { checkCapatcha } from "utils/functions";
import { useRecaptcha } from "hooks/useRecaptcha";

const KYC_Form: React.FC = () => {
  const { t } = useTranslation();
  const passportIdInput = useRef<HTMLInputElement>(null);
  const api = useApi();
  const navigate = useNavigate();
  const [initFormState, setInitFormState] = useState<KycData>({
    id: 0,
    gender: "",
    country: "",
    city: "",
    address: "",
    phone_number: "",
    author_type: "",
    author_art_type: "",
    passport_id: "",
  });
  const userData: UserData = useAppSelector((state) => state.account.userData);

  const recaptcha = useRecaptcha();

  useEffect(() => {
    if (userData?.kyc_form) {
      setInitFormState(userData?.kyc_form);
    }
  }, [userData]);

  const isFormDisables = () => {
    return (
      userData?.kyc_form?.status == "on_review" ||
      userData?.kyc_form?.status == "approved" ||
      userData.kyc_form?.status == "pending"
    );
  };

  return (
    <div data-nc-id="KYCPage">
      <Helmet>
        <title>KYC</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("Sahaba_NFTs_Verification")}
            </h2>
            <p className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span className="block my-3">
                {t("Sahaba_NFTs_Verification_desc1")}
              </span>
              <span className="block my-3"></span>
              <span className="block my-3">
                {t("Sahaba_NFTs_Verification_desc3")}
              </span>
              <span className="block my-3 text-white">
                {t("Sahaba_NFTs_Verification_desc4")}
              </span>
              <ul>
                {[
                  {
                    title: t("Be_Authentic"),
                    p: t("Be_Authentic_desc"),
                  },
                  {
                    title: t("Stay_Respectful"),
                    p: t("Stay_Respectful_desc"),
                  },
                  {
                    title: t("No_Double_Minting"),
                    p: t("No_Double_Minting_desc"),
                  },
                ].map((item, index) => (
                  <li key={index} className="my-3">
                    <h4 className="text-white">{item.title}</h4>
                    <p>{item.p}</p>
                  </li>
                ))}
              </ul>
            </p>
          </div>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          {userData.kyc_form && (
            <Alert
              color={
                userData.kyc_form.status == "approved"
                  ? "success"
                  : userData.kyc_form.status == "on_review"
                  ? "info"
                  : userData.kyc_form.status == "pending"
                  ? "warning"
                  : userData.kyc_form.status == "rejected"
                  ? "error"
                  : "default"
              }
            >
              {userData.kyc_form.status == "approved"
                ? t("kyc_approved")
                : userData.kyc_form.status == "on_review"
                ? t("kyc_on_review")
                : userData.kyc_form.status == "pending"
                ? t("kyc_pending")
                : userData.kyc_form.status == "rejected"
                ? t("kyc_rejected")
                : "default"}
            </Alert>
          )}
          <div className="flex flex-col md:flex-row">
            <Formik
              initialValues={initFormState}
              enableReinitialize
              validationSchema={kycSchema}
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
                if (userData.status === "suspended") {
                  return;
                }
                const form = new FormData();
                for (const [key, value] of Object.entries(values)) {
                  form.append(key, value);
                }

                try {
                  await api.post("/kyc", form, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  toast.success(t("thank_you_for_submitting_your_kyc"));
                  navigate(-1);
                } catch (error: any) {
                  toast.error(
                    error.response?.data?.message || t("system_error")
                  );
                }
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                errors,
              }) => (
                <>
                  <div className="flex-grow max-w-3xl mt-10 space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">
                    {/* ---- */}
                    <div>
                      <Label htmlFor="gender">{t("Gender")}</Label>
                      <div className="flex items-center gap-8 my-1">
                        <Radio
                          label={t("male")}
                          id="gender"
                          name="gender"
                          disabled={isFormDisables()}
                          className="my-3"
                          defaultChecked={values.gender === "male"}
                          onChange={() => setFieldValue("gender", "male")}
                        />
                        <Radio
                          label={t("female")}
                          id="gender"
                          name="gender"
                          disabled={isFormDisables()}
                          className="my-3"
                          defaultChecked={values.gender === "female"}
                          onChange={() => setFieldValue("gender", "female")}
                        />
                      </div>
                      <ErrorMessage
                        name="gender"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">{t("Country")}</Label>
                      <Select
                        id="country"
                        name="country"
                        value={values.country}
                        disabled={isFormDisables()}
                        onChange={handleChange("country")}
                        onBlur={handleBlur("country")}
                      >
                        <option value="" disabled>
                          {t("Select_your_country")}
                        </option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="country"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">{t("City")}</Label>
                      <Input
                        className="mt-1.5"
                        type="text"
                        id="city"
                        name="city"
                        disabled={isFormDisables()}
                        value={values.city}
                        onBlur={handleBlur("city")}
                        onChange={handleChange("city")}
                      />
                      <ErrorMessage
                        name="city"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">{t("Address")}</Label>
                      <Input
                        className="mt-1.5"
                        type="text"
                        id="address"
                        name="address"
                        disabled={isFormDisables()}
                        value={values.address}
                        onBlur={handleBlur("address")}
                        onChange={handleChange("address")}
                      />
                      <ErrorMessage
                        name="address"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    {values.country && (
                      <div className="">
                        <Label htmlFor="phone_number">
                          {t("phone_number")}
                        </Label>
                        <div className="mt-1.5 flex">
                          <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            {
                              countries.find(
                                (country) => country.name == values.country
                              )?.dial_code
                            }
                          </span>
                          <Input
                            className="!rounded-l-none"
                            value={values.phone_number}
                            type="tel"
                            disabled={isFormDisables()}
                            id="phone_number"
                            name="phone_number"
                            onChange={handleChange("phone_number")}
                            onBlur={handleBlur("phone_number")}
                            placeholder="910000001"
                          />
                        </div>
                        <ErrorMessage
                          name="phone_number"
                          component="p"
                          className="text-red-600"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="author_type">
                        {t("Are_you_a_creator_or_collector")}
                      </Label>
                      <Radio
                        label="Creator"
                        id="author_type"
                        name="author_type"
                        disabled={isFormDisables()}
                        className="my-3"
                        defaultChecked={values.author_type === "creator"}
                        onChange={() => setFieldValue("author_type", "creator")}
                      />
                      <Radio
                        label="Collector"
                        id="author_type"
                        name="author_type"
                        disabled={isFormDisables()}
                        className="my-3"
                        defaultChecked={values.author_type === "collector"}
                        onChange={() =>
                          setFieldValue("author_type", "collector")
                        }
                      />
                      <ErrorMessage
                        name="author_type"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    {/* ---- */}
                    <div>
                      <Label>
                        {t(
                          "What_art_do_you_plan_to_create_or_share_on_SahabaNFTs"
                        )}
                      </Label>
                      <Textarea
                        rows={3}
                        className="mt-1.5"
                        value={values.author_art_type}
                        disabled={isFormDisables()}
                        id="author_art_type"
                        name="author_art_type"
                        onChange={handleChange("author_art_type")}
                        onBlur={handleBlur("author_art_type")}
                        placeholder=""
                      />
                      <ErrorMessage
                        name="author_art_type"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <Label>{t("Upload_your_passport_id")}</Label>
                      <div
                        onClick={() => {
                          passportIdInput?.current?.click();
                        }}
                        className={`flex flex-col items-center justify-center h-56 mt-2 rounded-lg cursor-pointer bg-neutral-100/70 dark:bg-black/20 ${
                          errors.passport_id && "border-2 border-red-600"
                        }`}
                      >
                        <i
                          className={`text-4xl bx ${
                            !!values.passport_id
                              ? "bx-check-circle text-green-500"
                              : "bx-cloud-upload"
                          }`}
                        ></i>
                        <span>
                          {!!values.passport_id
                            ? "replace file"
                            : "Upload a file"}
                        </span>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Accept PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        id="passport_id"
                        name="passport_id"
                        ref={passportIdInput}
                        className="sr-only"
                        accept="image/*,application/pdf"
                        disabled={isFormDisables()}
                        onChange={async (e) => {
                          if (!e.target.files) return;
                          const file = e.target.files[0];
                          if (file?.size / 1024 / 1024 > 10) {
                            toast.warn(
                              "file size is to large, max size is 10mb"
                            );
                            return;
                          }
                          setFieldValue("passport_id", file);
                        }}
                      />
                      <ErrorMessage
                        name="passport_id"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    {/* ---- */}
                    <div className="pt-2">
                      <ButtonPrimary
                        loading={isSubmitting}
                        disabled={
                          userData.status === "suspended" ||
                          isSubmitting ||
                          isFormDisables()
                        }
                        className="w-full"
                        onClick={handleSubmit}
                      >
                        {t("Submit_verification")}
                      </ButtonPrimary>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC_Form;
