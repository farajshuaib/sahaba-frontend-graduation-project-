import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ErrorMessage, Formik } from "formik";
import { useApi } from "hooks/useApi";
import { toast } from "react-toastify";
import {  useAppSelector } from "app/hooks";
import Select from "shared/Select/Select";
import countries from "data/countries";
import Radio from "shared/Radio/Radio";
import { kycSchema } from "services/validations";

const KYC_Form: React.FC = () => {
  const passportIdInput = useRef<HTMLInputElement>(null);
  const api = useApi();
  const userData: UserData = useAppSelector((state) => state.account.userData);

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
              Sahaba NFTs Verification
            </h2>
            <p className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span className="block my-3">
                Please note that verification may take several days/weeks for
                the process.
              </span>
              <span className="block my-3">
                Due to the amount of applications we get, we are not able to
                inform you about your status of your application, if your
                profile hasn't been verified in 60 days of applying, you can try
                again
              </span>
              <span className="block my-3">
                Request for verification does not guarantee that your account
                will be verified.
              </span>
              <span className="block my-3 text-white">
                🚫 AirNFT Rules (if you do not follow any of these rules you
                won't be verified)
              </span>
              <ul>
                {[
                  {
                    title: "Be Authentic",
                    p: "You should only mint artwork originally created by you, do not upload copyrighted artwork and do not modify work done by other artists (do not do fan art, use logos of big companies, copy paste and sell images that are free to use etc...)",
                  },
                  {
                    title: "Stay Respectful",
                    p: "Do not mint or share any artwork that our community will deem racist, sexist, homophobic, NSFW or otherwise harmful and non-inclusive",
                  },
                  {
                    title: "No Double Minting",
                    p: "Do not mint and sell the same artwork that is sold anywhere else, otherwise your verification will fail",
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
          <div className="flex flex-col md:flex-row">
            <Formik
              initialValues={{
                gender: "",
                country: "",
                city: "",
                address: "",
                phone_number: "",
                author_type: "",
                author_art_type: "",
                passport_id: "",
              }}
              validationSchema={kycSchema}
              onSubmit={async (values) => {
                const form = new FormData();
                for (const [key, value] of Object.entries(values)) {
                  form.append(key, value);
                }

                await api.post("/kyc", form, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
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
              }) => (
                <>
                  <div className="flex-grow max-w-3xl mt-10 space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">
                    {/* ---- */}
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        placeholder="male"
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange("gender")}
                        onBlur={handleBlur("gender")}
                      >
                        <option disabled>select your gender</option>
                        <option value={"male"}>male</option>
                        <option value={"female"}>female</option>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        placeholder="male"
                        id="country"
                        name="country"
                        value={values.country}
                        onChange={handleChange("country")}
                        onBlur={handleBlur("country")}
                      >
                        <option disabled>select your country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        className="mt-1.5"
                        type="text"
                        id="city"
                        name="city"
                        value={values.city}
                        onBlur={handleBlur("city")}
                        onChange={handleChange("city")}
                      />
                      <ErrorMessage name="city" />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        className="mt-1.5"
                        type="text"
                        id="address"
                        name="address"
                        value={values.address}
                        onBlur={handleBlur("address")}
                        onChange={handleChange("address")}
                      />
                      <ErrorMessage name="address" />
                    </div>

                    {values.country && (
                      <div className="">
                        <Label htmlFor="phone_number">phone number</Label>
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
                            id="phone_number"
                            name="phone_number"
                            onChange={handleChange("phone_number")}
                            onBlur={handleBlur("phone_number")}
                            placeholder="910000001"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="author_type">
                        Are you a creator or collector
                      </Label>
                      <Radio
                        label="Creator"
                        id="author_type"
                        name="author_type"
                        className="my-3"
                        onChange={() => setFieldValue("author_type", "creator")}
                      />
                      <Radio
                        label="Collector"
                        id="author_type"
                        name="author_type"
                        className="my-3"
                        onChange={() =>
                          setFieldValue("author_type", "collector")
                        }
                      />
                    </div>

                    {/* ---- */}
                    <div>
                      <Label>
                        What art do you plan to create or share on SahabaNFTs
                      </Label>
                      <Textarea
                        rows={3}
                        className="mt-1.5"
                        value={values.author_art_type}
                        id="author_art_type"
                        name="author_art_type"
                        onChange={handleChange("author_art_type")}
                        onBlur={handleBlur("author_art_type")}
                        placeholder=""
                      />
                    </div>

                    <div>
                      <Label>Upload your passport id</Label>
                      <div
                        onClick={() => {
                          passportIdInput?.current?.click();
                        }}
                        className="flex flex-col items-center justify-center h-56 mt-2 rounded-lg cursor-pointer bg-neutral-100/70 dark:bg-black/20"
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
                    </div>

                    {/* ---- */}
                    <div className="pt-2">
                      <ButtonPrimary
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full"
                        onClick={handleSubmit}
                      >
                        Submit verification
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
