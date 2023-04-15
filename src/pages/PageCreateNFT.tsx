import Label from "components/Label/Label";
import React, { FC, useEffect, useMemo, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import { Formik, ErrorMessage, FormikErrors, FormikTouched } from "formik";
import { useAppSelector } from "app/hooks";
import { useWeb3React } from "@web3-react/core";
import useIpfs from "hooks/useIpfs";
import { useCrud } from "hooks/useCrud";
import { IPFS_BASE_URL } from "constant";
import { BigNumber, utils } from "ethers";
import { createNftSchema, validateImage } from "services/validations";
import { toast } from "react-toastify";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useNavigate } from "react-router-dom";
import { checkCapatcha, usdPrice } from "utils/functions";
import { Alert } from "shared/Alert/Alert";
import { useTranslation } from "react-i18next";
import { useRecaptcha } from "hooks/useRecaptcha";
import useContract from "hooks/useContract";
import { compressFile } from "services/compressFiles";

interface UploadFileProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  setFieldValue: (key: string, value: any) => any;
  values: any;
}

const UploadFile: React.FC<UploadFileProps> = ({
  errors,
  touched,
  setFieldValue,
  values,
}) => {
  const { t } = useTranslation();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const ipfs = useIpfs();
  const { i18n } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold sm:text-2xl">Image</h3>
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {t("supported_files")}
      </span>
      <label
        htmlFor="file-upload"
        className={`mt-5 relative cursor-pointer flex justify-center px-6 pt-5 pb-6  border-2 border-dashed ${
          touched.file_path && errors.file_path
            ? "border-red-600"
            : "border-neutral-300 dark:border-neutral-6000"
        }  rounded-xl`}
      >
        <div className="space-y-1 text-center">
          {uploadLoading ? (
            <i className="text-4xl bx bx-loader-alt bx-spin "></i>
          ) : (
            <>
              {values.file_path ? (
                <div className="mx-auto text-center">
                  <i className="block mx-auto text-5xl text-green-500 bx bx-check-circle"></i>
                  <a
                    href={values.file_path}
                    target="_blank"
                    className="block mx-auto my-2 text-sm leading-relaxed tracking-wide text-center text-black hover:underline dark:text-white"
                  >
                    {t("preview")}
                  </a>
                </div>
              ) : (
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
              )}
            </>
          )}

          <div className="flex text-sm text-center text-neutral-6000 dark:text-neutral-300">
            <span className="relative mx-auto font-medium text-center rounded-md cursor-pointer text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
              <span>
                {values.file_path ? t("replace_file") : t("Upload_your_art")}
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files) return;
                  let file = e.target.files[0];
                  const validImage = await validateImage(file);
                  if (!validImage) return;

                  try {
                    setUploadLoading(true);

                    file = (await compressFile(file)) as File;

                    const added = await ipfs.add(file);

                    setFieldValue("file_type", file.type);

                    setFieldValue("file_path", IPFS_BASE_URL + added.path);

                    toast.success(
                      t("image_uploaded_to_the_IPFS_successfully") as string
                    );
                  } catch (e) {
                    toast.error(
                      t(
                        "something_went_wrong_while_uploading_the_image"
                      ) as string
                    );
                  }
                  setUploadLoading(false);
                }}
              />
            </span>
            {/* <p className="pl-1">{t("or_drag_and_drop")}</p> */}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            PNG, JPEG, WEBP, JPG, GIF up to 10MB
          </p>
        </div>
      </label>
    </div>
  );
};

const PageCreateNFTImage: FC = () => {
  const { t } = useTranslation();
  const { library, account } = useWeb3React();
  const navigate = useNavigate();
  const myCollections = useAppSelector((state) => state.general.myCollections);
  const { create } = useCrud("/nfts");
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [ownerReceived, setOwnerReceived] = useState<number>(0);
  const { i18n } = useTranslation();

  const recaptcha = useRecaptcha();

  const userData = useAppSelector(
    (state) => state.account?.userData
  ) as UserData;

  const { contract, isApprovedForAll, setApprovalForAll } = useContract();

  const getAccountBalance = async () => {
    if (!account) return;
    const balance = await library.getBalance(account);
    setBalance(formatEther(balance));
  };

  async function getServiceFeesPrice() {
    const res = await contract.getServiceFeesPrice();
    setServiceFee(+utils.formatEther(res).toString());
  }

  useEffect(() => {
    getServiceFeesPrice();
    getAccountBalance();
  }, []);

  const calcOwnerReceived = (price: number) => {
    const fees = price * serviceFee;
    setOwnerReceived(price - fees);
  };

  return (
    <div className={`nc-PageUploadItem `} data-nc-id="PageUploadItem">
      <Helmet>
        <title>Mint an NFT</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("Mint an NFT")}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {t("Create_NFT_desc")}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <Formik
            initialValues={{
              title: "",
              description: "",
              file_path: "",
              file_type: "",
              price: 0,
              collection_id: 0,
            }}
            validationSchema={createNftSchema}
            onSubmit={async (values, { setFieldError }) => {
              if (userData && userData?.status === "suspended") {
                toast.error(t("Your_account_is_suspended") as string);
                setError(t("Your_account_is_suspended") as string);
                return;
              }

              if (!recaptcha) {
                toast.error("Beep-bop, you're a robot!");
                return;
              }

              const token = await checkCapatcha();

              if (!token) {
                toast.error(t("please_verify_you_are_not_a_robot") as string);
                return;
              }

              if (balance == "0") {
                setError(t("not_enough_balance") as string);
                return;
              }
              if (values.collection_id == 0) {
                setFieldError(
                  "collection_id",
                  t("collection_is_required") as string
                );
                return;
              }
              if (values.price == 0) {
                setFieldError("price", t("price_must_be_above_0") as string);
                return;
              }

              try {
                let is_approved = await isApprovedForAll();
                if (!is_approved) {
                  await setApprovalForAll();
                }

                // calc the platform fees
                let feeAmount: number = 0;
                if (serviceFee > 0) {
                  feeAmount = values.price * serviceFee;
                }
                const tx = await contract.createAndListToken(
                  values.file_path,
                  parseEther(values.price.toString()),
                  values.collection_id
                );

                const res = await tx.wait();

                if (!res.events) {
                  toast.error(t("something_went_wrong") as string);
                  return;
                }

                const token_id = BigNumber.from(
                  res.events[0].args?.tokenId
                ).toString();

                await create({
                  ...values,
                  id: token_id,
                  tx_hash: tx.hash,
                });

                toast.success(t("nft_created_successfully") as string);

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
                {/* select collection */}
                <div>
                  <Label>{t("Choose_collection")}</Label>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Choose_collection_desc")}
                  </div>
                  {myCollections && myCollections.length > 0 ? (
                    <RadioGroup
                      value={
                        myCollections &&
                        myCollections?.find(
                          (collection) => collection.id == values.collection_id
                        )
                      }
                      onChange={(collection) => {
                        if (!collection) return;
                        setFieldValue("collection_id", collection.id);
                      }}
                    >
                      <RadioGroup.Label className="sr-only">
                        Server size
                      </RadioGroup.Label>
                      <div className="flex gap-5 py-2 space-x-4 overflow-auto customScrollBar">
                        {myCollections &&
                          myCollections.map((collection: Collection, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={collection}
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
                                              src={collection.logo_image}
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
                                          {collection.name}
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
                  ) : (
                    <div className="flex justify-center ">
                      <ButtonPrimary
                        href={"/create-collection"}
                        className="relative z-10 block mx-auto my-12"
                      >
                        {t("Create_your_own_collection")}
                      </ButtonPrimary>
                    </div>
                  )}
                  <ErrorMessage
                    name="collection_id"
                    component={"span"}
                    className="text-sm text-red-600"
                  />
                </div>
                {/* divider */}
                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
                {/* upload image component */}
                <UploadFile
                  setFieldValue={(key, value) => setFieldValue(key, value)}
                  values={values}
                  touched={touched}
                  errors={errors}
                />

                {/* ---- */}
                <FormItem htmlFor="title" label={t("Title")}>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                  />
                  <ErrorMessage
                    name="title"
                    component={"p"}
                    className="text-sm text-red-600"
                  />
                </FormItem>

                {/* ---- */}
                <FormItem
                  label={t("Description")}
                  htmlFor="description"
                  desc={
                    <div>
                      {t("nft_description_desc")}
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
                    component={"span"}
                    className="text-sm text-red-600"
                  />
                </FormItem>

                {/* ---- */}
                <div>
                  <FormItem
                    label={t("price")}
                    desc={`${+serviceFee * 100}% ${t("service_fees")}`}
                  >
                    <div className="relative flex">
                      <span
                        className={`inline-flex items-center px-3 text-sm border ${
                          i18n.language == "ar"
                            ? "border-l-0 rounded-r-2xl"
                            : "border-r-0 rounded-l-2xl"
                        }  border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400`}
                      >
                        ETH
                      </span>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={(e) => {
                          setFieldValue("price", e.currentTarget.value);
                          calcOwnerReceived(+e.currentTarget.value);
                        }}
                        onBlur={handleBlur("price")}
                        min={0.001}
                        max={5.0}
                        className={` rounded-none z-10 w-full `}
                        placeholder="0.01"
                      />
                      <span
                        className={`inline-flex items-center px-3 text-sm align-middle border  ${
                          i18n.language == "ar"
                            ? "border-r-0 rounded-l-2xl"
                            : "border-l-0 rounded-r-2xl"
                        }  border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 whitespace-nowrap`}
                      >
                        {usdPrice(+values.price)}
                      </span>
                    </div>
                    <ErrorMessage
                      name="price"
                      component={"span"}
                      className="text-sm text-red-600"
                    />
                  </FormItem>
                  <div className="relative flex items-baseline gap-1 text-sm font-semibold text-green-500">
                    <span className=" text-neutral-500 dark:text-neutral-400">
                      {t("you_will_receive")}
                    </span>
                    <span className="">{ownerReceived} ETH</span>
                    <span className="">≈ {usdPrice(ownerReceived)}</span>
                  </div>
                </div>

                {!!error && (
                  <Alert type="error">
                    <h6>{error}</h6>
                  </Alert>
                )}

                {/* ---- */}
                <div className="flex flex-col gap-2 pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ">
                  <ButtonPrimary
                    loading={isSubmitting}
                    type="submit"
                    disabled={userData?.status == "suspended" || isSubmitting}
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    {t("Upload_item")}
                  </ButtonPrimary>
                  <ButtonSecondary onClick={handleReset} className="flex-1">
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

export default PageCreateNFTImage;
