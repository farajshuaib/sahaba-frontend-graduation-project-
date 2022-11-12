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
import { CONTRACT_ABI, CONTRACT_ADDRESS, IPFS_BASE_URL } from "constant";
import { BigNumber, Contract, utils } from "ethers";
import { createNftSchema, validateImage } from "services/validations";
import { toast } from "react-toastify";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useNavigate } from "react-router-dom";
import { checkCapatcha, usdPrice } from "utils/functions";
import { Alert } from "shared/Alert/Alert";
import { useTranslation } from "react-i18next";
import { useRecaptcha } from "hooks/useRecaptcha";

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

  const handleUpload = async (e: any) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!validateImage(file)) return;

    try {
      setUploadLoading(true);

      const added = await ipfs.add(file);

      setFieldValue("file_type", file.type);

      setFieldValue("file_path", IPFS_BASE_URL + added.path);

      toast.success(t("image_uploaded_to_the_IPFS_successfully"));
    } catch (e) {
      toast.error(t("something_went_wrong_while_uploading_the_image"));
    }
    setUploadLoading(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold sm:text-2xl">Image/*</h3>
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {t("supported_files")}
      </span>
      <div
        onDrop={handleUpload}
        onClick={handleUpload}
        className={`mt-5 relative flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed ${
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
                <i className="text-5xl text-green-500 bx bx-check-circle"></i>
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

          <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
            <label
              htmlFor="file-upload"
              className="relative font-medium rounded-md cursor-pointer text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>
                {values.file_path ? t("replace_file") : t("Upload_image")}
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
            <p className="pl-1">{t("or_drag_and_drop")}</p>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export interface PageUploadItemProps {
  className?: string;
}

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { library, account } = useWeb3React();
  const navigate = useNavigate();
  const myCollections = useAppSelector((state) => state.general.myCollections);
  const { create } = useCrud("/nfts");
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [ownerReceived, setOwnerReceived] = useState<number>(0);

  const recaptcha = useRecaptcha();

  const userData = useAppSelector(
    (state) => state.account.userData
  ) as UserData;

  const contract = useMemo(() => {
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, library?.getSigner());
  }, []);

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
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Create NFT</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("Create_New_NFT")}
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
            onSubmit={async (values, { setFieldError, setSubmitting }) => {
              if (userData && userData?.status === "suspended") {
                setError(t("Your_account_is_suspended"));
                return;
              }

              if (!recaptcha) {
                toast.error("Beep-bop, you're a robot!");
                return;
              }

              const token = await checkCapatcha();

              if (!token) {
                toast.error(t("please_verify_you_are_not_a_robot"));
                return;
              }

              if (balance == "0") {
                setError(t("not_enough_balance"));
                return;
              }
              if (values.collection_id == 0) {
                setFieldError("collection_id", t("collection_is_required"));
                return;
              }
              if (values.price == 0) {
                setFieldError("price", t("price_must_be_above_0"));
                return;
              }
              try {
                const isApprovedForAll = await contract.isApprovedForAll(
                  account,
                  CONTRACT_ADDRESS
                );

                if (!isApprovedForAll) {
                  await contract.setApprovalForAll(CONTRACT_ADDRESS, true);
                }

                const tx = await contract.createAndListToken(
                  values.file_path,
                  parseEther(values.price.toString()),
                  values.collection_id
                );

                console.log(tx);
                const res = await tx.wait();

                console.log(res);

                const token_id = BigNumber.from(
                  res.events[0].args.nftId
                ).toString();

                console.log(token_id);

                await create({
                  ...values,
                  id: token_id,
                  tx_hash: tx.hash,
                });

                toast.success(t("nft_created_successfully"));

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
              <div
                onDrop={(e) => console.log(e)}
                className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8"
              >
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
                      <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
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
                        className="!rounded-l-none w-full"
                        placeholder="0.01"
                      />
                      <span className="absolute right-0 p-3 text-sm align-middle border border-l-0 rounded-r-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
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

                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

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
                      <div className="flex py-2 space-x-4 overflow-auto customScrollBar">
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

                {!!error && (
                  <Alert type="error">
                    <h6>{error}</h6>
                  </Alert>
                )}

                {/* ---- */}
                <div className="flex flex-col pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ">
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

export default PageUploadItem;
