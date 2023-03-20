import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import VerifyIcon from "./VerifyIcon";
import useCountDownTime from "hooks/useCountDownTime";
import { useTranslation } from "react-i18next";
import BlurHiddenNft from "./BlurHiddenNft";

export interface CardNFTProps {
  className?: string;
  nft: Nft;
}

const CardNFT: FC<CardNFTProps> = ({ className = "", nft }) => {
  const { t } = useTranslation();
  const timeLeft = useCountDownTime(nft?.sale_end_at);
  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <div className="relative flex-shrink-0 overflow-hidden">
        <div className="relative overflow-hidden">
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft.file_path}
            contentType={nft.file_type}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
          {nft.status == "hidden" && <BlurHiddenNft />}
        </div>

        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
        <LikeButton
          liked={nft.is_liked}
          nft_id={nft.id}
          like_count={nft.like_count}
          className="absolute top-3 right-3 z-10 !h-9"
        />
      </div>

      <div className="p-4 py-5 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar
            imgUrl={nft?.creator?.profile_photo}
            sizeClass="h-6 w-6"
            containerClassName="ring-2 ring-white"
          />
          <div className="text-xs ">
            <span className="font-normal">by</span>
            {` `}
            <span className="font-medium">
              {nft?.creator?.username ||
                nft?.creator.wallet_address.slice(0, 6) +
                  "..." +
                  nft?.creator.wallet_address.slice(-4)}
            </span>
          </div>
          {nft?.creator?.kyc_form?.status == "approved" && (
            <VerifyIcon iconClass="w-4 h-4" />
          )}
        </div>
        <h2 className={`text-lg font-medium`}>{nft.title}</h2>

        <div className="w-full border-b w-2d4 border-neutral-100 dark:border-neutral-700"></div>

        <div className="flex items-end justify-between ">
          <Prices
            labelText={t("price")}
            price={`${nft.price} ETH`}
            labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
          />
          {nft.is_for_sale && (
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <ClockIcon className="w-4 h-4" />
              <span className="ml-1 mt-0.5">
                <span className="">
                  {timeLeft.days} {t("d")} : {timeLeft.hours} {t("h")} :{" "}
                  {timeLeft.minutes}
                  {t("m")} : {timeLeft.seconds}
                  {t("s")}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      <Link to={`/nft-details/${nft?.id}`} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardNFT;
