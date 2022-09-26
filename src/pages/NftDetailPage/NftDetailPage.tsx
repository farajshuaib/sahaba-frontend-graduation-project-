import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import VerifyIcon from "components/VerifyIcon";
import { nftsLargeImgs, personNames } from "contains/fakeData";
import TimeCountDown from "./TimeCountDown";
import TabDetail from "./TabDetail";
import collectionPng from "assets/images/nfts/collection.png";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import LikeButton from "components/LikeButton";
import AccordionInfo from "./AccordionInfo";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useCrud } from "hooks/useCrud";
import { useHistory, useParams } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";
import { Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "constant";
import { useApi } from "hooks/useApi";
import { parseEther } from "ethers/lib/utils";
import ServerError from "components/ServerError";

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const params: any = useParams();
  const history = useHistory();
  const { library } = useWeb3React();
  const api = useApi();
  const userData = useAppSelector((state) => state.account.userData);
  const { item, loading, fetchById, errors } = useCrud("/nfts");
  const [loadingButton, setLoadingButton] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);

  const contract = new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    library?.getSigner()
  );

  useEffect(() => {
    if (params.id) fetchById(params.id);
  }, [params.id]);

  const makeOffer = () => {
    if (!userData) {
      history.push("/connect-wallet");
      return;
    }
  };

  const stopSale = async () => {
    try {
      await contract.cancelListing(item.id);

      await api.put(`/stop-sale/${item.id}`);

      setIsOnSale(false);
      toast.success("Item canceled from the listing successfully");
    } catch (err: any) {
      toast.error(
        err?.response.data.message ||
          "System error please try again later if the problem persists report an incident by contacting our Support Team."
      );
    }
  };

  const buyNft = async () => {
    if (!userData) {
      history.push("/connect-wallet");
      return;
    }
    setLoadingButton(true);
    try {
      await approveBuyItem();

      await contract.buyToken(item.id);

      await api.post(`/buy-item`, { item_id: item.id });

      toast.success("You have successfully bought this item");
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.response.data.message ||
          "System error please try again later if the problem persists report an incident by contacting our Support Team."
      );
    }
    setLoadingButton(false);
  };

  const approveBuyItem = async () => {
    const allowance = await contract.allowance(
      userData.wallet_address,
      CONTRACT_ADDRESS
    );

    if (!Number(allowance)) {
      await contract.approve(
        CONTRACT_ADDRESS,
        parseEther("9999999999999999999999999999")
      );
      // toast.success("Spend approved");
    }
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
            <Badge name="Virtual Worlds" color="green" />
            <LikeSaveBtns nft={item} />
          </div>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {item.title}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
            <div className="flex items-center ">
              <Avatar
                imgUrl={item?.user?.profile_photo}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Creator</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item.user.username}</span>
                  {item.user.is_verified && <VerifyIcon iconClass="w-4 h-4" />}
                </span>
              </span>
            </div>
            <div className="hidden h-6 border-l sm:block border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar
                imgUrl={item.collection.logo_image}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item.collection?.name}</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        <div className="py-9">
          <TimeCountDown />
        </div>

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                price
              </span>
              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                {item.price} ETH
              </span>
              <span className="text-lg text-neutral-400 sm:ml-5">
                ( ≈ $3,221.22)
              </span>
            </div>

            <span className="mt-2 ml-5 text-sm text-neutral-500 dark:text-neutral-400 sm:mt-0 sm:ml-10">
              {/* [96 in stock] */}
            </span>
          </div>

          <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <ButtonPrimary onClick={buyNft} className="flex-1">
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

              <span className="ml-2.5">buy</span>
            </ButtonPrimary>
            <ButtonSecondary onClick={makeOffer} className="flex-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.57007 15.27L15.11 8.72998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2.5"> Make offer</span>
            </ButtonSecondary>
          </div>
        </div>

        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <TabDetail />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
      {/* MAIn */}
      <main className="container flex mt-11 ">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={item.file_path}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
              />
              {/* META TYPE */}
              <ItemTypeVideoIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" />

              {/* META FAVORITES */}
              <LikeButton
                nft_id={item.id}
                liked={item.is_liked}
                like_count={item.like_count}
                className="absolute right-3 top-3 "
              />
            </div>

            <AccordionInfo nft={item} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>

      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div>

          {/* SECTION */}
          <SectionBecomeAnAuthor className="pt-24 lg:pt-32" />
        </div>
      )}
    </div>
  );
};

export default NftDetailPage;
