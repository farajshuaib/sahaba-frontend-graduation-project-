import React, { FC, useEffect, useMemo, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import VerifyIcon from "components/VerifyIcon";
import TimeCountDown from "./TimeCountDown";
import TabDetail from "./TabDetail";
import AccordionInfo from "./AccordionInfo";
import { useCrud } from "hooks/useCrud";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";
import { Contract, utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useApi } from "hooks/useApi";
import ServerError from "components/ServerError";
import { usdPrice } from "utils/functions";
import { Modal } from "flowbite-react";
import NftItem from "./NftItem";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import useContract from "hooks/useContract";

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { t } = useTranslation();
  const params: any = useParams();
  const navigate = useNavigate();
  const { library, account } = useWeb3React();
  const api = useApi();
  const userData = useAppSelector((state) => state.account.userData);
  const { item, loading, fetchById, errors } = useCrud("/nfts");
  const { create: submitBuyNft } = useCrud(`/nfts/buy/${params.id}`);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [forSaleModal, setForSaleModal] = useState<boolean>(false);

  const { contract, isApprovedForAll, setApprovalForAll } = useContract();

  async function increaseWatchTime() {
    api.post("/nfts/watch", { nft_id: params.id });
  }

  useEffect(() => {
    if (params.id) fetchById(params.id);
    if (params.id && userData) increaseWatchTime();
  }, [params.id]);

  const toggleForSale = async () => {
    if (!userData) {
      navigate("/connect-wallet");
      return;
    }
    if (userData?.status == "suspended") {
      toast.error(t("account_suspended") as string);
      return;
    }
    try {
      setLoadingButton(true);
      const tx = await contract.toggleForSale(item.id);
      await api.put(`/nfts/toggle-sale/${item.id}`, { tx_hash: tx.hash });
      toast.success(
        item.is_for_sale
          ? t("Item_canceled_from_the_selling_successfully") as string
          : t("NFT_set_for_sale_successfully") as string
      );
      await fetchById(params.id);
      setLoadingButton(false);
      setForSaleModal(false);
    } catch (err: any) {
      toast.error(err?.response.data.message || t("system_error"));
      setLoadingButton(false);
    }
  };

  const buyNft = async () => {
    if (!userData) {
      navigate("/connect-wallet");
      return;
    }
    if (userData?.status == "suspended") {
      toast.error(t("account_suspended") as string);
      return;
    }
    setLoadingButton(true);

    try {
      let is_approved = await isApprovedForAll();
      if (!is_approved) {
        await setApprovalForAll();
      }

      // if (buyWithSahabaCoin) {
      //   await approveBuyItem();
      // }

      const transaction = await contract.buyToken(item.id, {
        value: utils.parseEther(parseFloat(item.price).toString()),
        gasLimit: 3 * 10 ** 6,
      });

      await transaction.wait();

      await submitBuyNft({ tx_hash: transaction.hash });

      toast.success(t("buy_success") as string);

      await fetchById(params.id);
      setLoadingButton(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("system_error"));
    }
    setLoadingButton(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="space-y-5 pb-9">
          <div className="flex items-center justify-between">
            <Badge
              icon={<i className="text-xl bx bx-show"></i>}
              name={`${item.watch_time}`}
              color="green"
            />
            <LikeSaveBtns nft={item} getNft={() => fetchById(params.id)} />
          </div>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {item?.title}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-8">
            <Link
              to={`/author/${item.creator.id}`}
              className="flex items-center gap-3"
            >
              <Avatar
                imgUrl={item?.creator?.profile_photo}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="text-sm">{t("Creator")}</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>
                    {item?.creator?.username ||
                      item.creator.wallet_address.slice(0, 8) + "..."}
                  </span>
                  {item.creator?.kyc_form?.status == "approved" && (
                    <VerifyIcon iconClass="w-4 h-4" />
                  )}
                </span>
              </span>
            </Link>
            <div className="hidden h-6 border-l sm:block border-neutral-200 dark:border-neutral-700"></div>
            <Link
              to={`/collection/${item?.collection?.id}`}
              className="flex items-center gap-3"
            >
              <Avatar
                imgUrl={item?.collection?.logo_image}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="text-sm">{t("Collection")}</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item.collection?.name}</span>
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        {item.is_for_sale && (
          <div className="py-9">
            <TimeCountDown sale_end_at={item.sale_end_at} />
          </div>
        )}

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                {t("price")}
              </span>
              <span className="flex items-baseline gap-1 text-3xl font-semibold text-green-500 xl:text-4xl">
                <span>{item?.price} ETH</span>
              </span>
              <span className="text-lg text-neutral-400 sm:mx-2">
                ≈ {usdPrice(item?.price)}
              </span>
            </div>
          </div>

          {/* show buy button only when the nft is not owned by the current user and it's for sale */}
          {(userData?.id == item?.owner?.id || item.is_for_sale) && (
            <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <ButtonPrimary
                loading={loadingButton}
                disabled={userData?.status == "suspended" || loadingButton}
                onClick={() => {
                  userData?.id != item?.owner?.id
                    ? buyNft()
                    : setForSaleModal(true);
                }}
                className="flex-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2.5">
                  {userData?.id != item?.owner?.id
                    ? t("buy")
                    : item.is_for_sale
                    ? t("stop_sale")
                    : t("set_for_sale")}
                </span>
              </ButtonPrimary>
            </div>
          )}
        </div>

        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <TabDetail owner={item.owner} nft_id={item.id} />
        </div>
      </div>
    );
  };

  const renderSetForSaleModal = () => (
    <Modal show={forSaleModal} onClose={() => setForSaleModal(false)}>
      <Modal.Header>
        {item.is_for_sale ? t("cancel_NFT_sale") : t("Set_NFT_for_sale")}
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-xl text-gray-700 dark:text-gray-300">
          {item.is_for_sale
            ? t("cancel_NFT_sale_description")
            : t("Set_NFT_for_sale_description")}
        </h6>
      </Modal.Body>
      <Modal.Footer>
        <ButtonPrimary loading={loadingButton} onClick={toggleForSale}>
          {t("Confirm")}
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setForSaleModal(false)}>
          {t("Cancel")}
        </ButtonSecondary>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
      <Helmet>
        <title>{item?.title || "NFT Details"}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content={item?.file_type} />
        <meta property="og:title" content={item?.title} />
        <meta property="og:description" content={item?.description} />
        <meta property="og:image" content={item.file_path} />
        <meta property="twitter:title" content={item?.title} />
        <meta property="twitter:description" content={item?.description} />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:image" content={item.file_path} />
      </Helmet>
      {/* MAIn */}
      <main className="container flex mt-11 ">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <NftItem nft={item} />

            <AccordionInfo nft={item} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>

      {renderSetForSaleModal()}

      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div>

          {/* SECTION */}
        </div>
      )}
    </div>
  );
};

export default NftDetailPage;
