import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import RemainingTimeNftCard from "./RemainingTimeNftCard";
import useCountDownTime from "hooks/useCountDownTime";
import { useTranslation } from "react-i18next";
import BlurHiddenNft from "./BlurHiddenNft";

export interface CardNFT2Props {
  className?: string;
  nft: Nft;
}

const CardNFT2: FC<CardNFT2Props> = ({ className = "", nft }) => {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`nc-CardNFT2 relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5  ${className}`}
      data-nc-id="CardNFT2"
    >
      <div className="relative flex-shrink-0 ">
        <div className="relative overflow-hidden">
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft.file_path}
            contentType={nft.file_type}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
          {nft.status == "hidden" && <BlurHiddenNft />}
        </div>

        <ItemTypeImageIcon className="absolute bottom-2.5 right-2.5 w-7 h-7 md:w-9 md:h-9" />

        {/* LIKE AND AVATARS */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
          <LikeButton
            nft_id={nft.id}
            like_count={nft.like_count}
            liked={nft.is_liked}
            className=" !h-9"
          />
        </div>

        {/* ----TIME--- */}
        {nft.is_for_sale && nft.sale_end_at && (
          <RemainingTimeNftCard
            sale_end_at={nft.sale_end_at}
            contentClassName="right-5 top-1/2 -translate-y-1/2 pb-1"
          />
        )}

        <div className="absolute left-[-1px] bottom-[-0.4px] z-20">
          <svg
            className="text-white dark:text-neutral-900 w-64 md:w-[281px]"
            width="281"
            viewBox="0 0 281 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0V99H258.059C248.54 99 239.92 93.3743 236.089 84.6606L205.167 14.3394C201.335 5.62568 192.716 0 183.197 0H0Z"
              fill="currentColor"
            />
          </svg>

          <div
            dir="ltr"
            className={`absolute bottom-0 w-fit left-4 text-left z-10 p-1 `}
          >
            <h2 className={`text-base font-semibold whitespace-pre`}>{nft.title}</h2>

            <div className="w-full mt-1.5 flex justify-between items-end ">
              {/* <Prices2 /> */}
              <Prices
                price={`${nft.price} ETH`}
                labelText={t("price")}
                labelTextClassName="bg-white dark:bg-neutral-900 "
              />
            </div>
          </div>
        </div>
      </div>

      <Link to={`/nft-details/${nft.id}`} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardNFT2;
