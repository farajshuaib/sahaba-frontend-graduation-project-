import React, { FC } from "react";
import { Link } from "react-router-dom";
import NextPrev from "shared/NextPrev/NextPrev";
import NcImage from "shared/NcImage/NcImage";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import LikeButton from "components/LikeButton";
import TimeCountDown from "./TimeCountDown";
import VerifyIcon from "components/VerifyIcon";
import { getUserSlug, usdPrice } from "utils/functions";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import { useTranslation } from "react-i18next";
import BlurHiddenNft from "components/BlurHiddenNft";

export interface CardLarge1Props {
  className?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  nft: Nft;
}

const CardLarge1: FC<CardLarge1Props> = ({
  className = "",
  onClickNext = () => {},
  onClickPrev = () => {},
  nft,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse lg:flex-row justify-end ${className}`}
    >
      <div
        className={`z-10 w-full -mt-2 lg:absolute ${
          i18n.language == "ar" ? "lg:right-0" : "lg:left-0"
        } lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:mt-0 sm:px-5 lg:px-0 lg:max-w-lg `}
      >
        <div className="p-4 space-y-3 bg-white shadow-lg nc-CardLarge1__left sm:p-8 xl:py-14 md:px-10 dark:bg-neutral-900 rounded-3xl sm:space-y-8 ">
          {/* TITLE */}
          <h2 className="text-2xl font-semibold lg:text-3xl 2xl:text-5xl ">
            <Link to={`/nft-details/${nft.id}`} title="Walking On Air">
              {nft?.title}
            </Link>
          </h2>

          {/* AUTHOR AND COLLECTION */}
          <div className="flex flex-col gap-5 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-12">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10">
                <Link to={`/author/${nft.creator?.id}`}>
                  <Avatar
                    imgUrl={nft.creator?.profile_photo}
                    sizeClass="w-10 h-10"
                  />
                </Link>
              </div>
              <div className="">
                <Link
                  to={`/author/${nft.creator.id}`}
                  className="block text-xs dark:text-neutral-400"
                >
                  {t("Creator")}
                </Link>
                <div className="flex items-center text-sm font-semibold">
                  <span>{getUserSlug(nft.creator)}</span>
                  {nft.creator.kyc_form?.status == "approved" && <VerifyIcon />}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/collection/${nft.collection.id}`}
                className="flex-shrink-0 w-10 h-10"
              >
                <Avatar
                  imgUrl={nft.collection?.logo_image}
                  sizeClass="w-10 h-10"
                />
              </Link>
              <div className="">
                <div className="text-xs dark:text-neutral-400">
                  {t("Collection")}
                </div>
                <div className="text-sm font-semibold ">
                  {nft.collection.name}
                </div>
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="pt-6">
            <div className="relative flex flex-col items-baseline gap-3 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
              <span className="block absolute bottom-full translate-y-1.5 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 ring ring-offset-0 ring-white dark:ring-neutral-900">
                {t("price")}
              </span>
              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                {nft.price} ETH
              </span>
              <span className="text-lg text-neutral-400">
                ≈ ${usdPrice(nft.price)}
              </span>
            </div>
          </div>

          {/* AUTION TIME */}
          {nft.is_for_sale && <TimeCountDown sale_end_at={nft.sale_end_at} />}

          <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700"></div>

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <ButtonSecondary href={`/nft-details/${nft.id}`} className="flex-1">
              {t("View_item")}
            </ButtonSecondary>
          </div>
        </div>
        <div className="p-4 sm:pt-8 sm:px-10 ">
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div>
      </div>

      <div className="w-full lg:w-[40%] relative ">
        <div className="relative nc-CardLarge1__right">
          <Link to={`/nft-details/${nft.id}`}>
            <NcImage
              containerClassName="aspect-w-1 aspect-h-1 relative"
              className="absolute inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white dark:border-neutral-800"
              src={nft.file_path}
              alt={nft.title}
            />
          </Link>

          {nft.status == "hidden" && <BlurHiddenNft />}

          {/* META TYPE */}
          <ItemTypeImageIcon className="absolute w-8 h-8 md:w-10 md:h-10 left-3 bottom-3 sm:left-7 sm:bottom-7 " />

          {/* META FAVORITES */}
          <LikeButton
            nft_id={nft.id}
            like_count={nft.like_count}
            liked={nft.is_liked}
            className="absolute right-3 top-3 sm:right-7 sm:top-7"
          />
        </div>
      </div>
    </div>
  );
};

export default CardLarge1;
