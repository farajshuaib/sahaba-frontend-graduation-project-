import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import ButtonPlayMusicRunningContainer from "pages/ButtonPlayMusicRunningContainer";
import { nanoid } from "@reduxjs/toolkit";
import VideoForNft from "./VideoForNft";

export interface CardNFTVideoProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
}

const CardNFTVideo: FC<CardNFTVideoProps> = ({
  className = "",
  isLiked,
  featuredImage = nftsImgs[1],
}) => {
  const [DEMO_NFT_ID] = React.useState(nanoid());

  const renderAvatars = () => {
    return (
      <div className="hidden -space-x-1 sm:flex ">
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
      </div>
    );
  };

  const renderIcon = (state?: "playing" | "loading") => {
    if (!state) {
      return (
        <svg className="ml-0.5 w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          ></path>
        </svg>
      );
    }

    return (
      <svg className=" w-9 h-9" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15.25 6.75V17.25"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.75 6.75V17.25"
        ></path>
      </svg>
    );
  };

  const renderListenButtonDefault = (state?: "playing" | "loading") => {
    return (
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full  cursor-pointer ${
          state === "playing"
            ? "bg-neutral-900/40 text-primary-50"
            : "bg-neutral-50/80 text-primary-500"
        }`}
      >
        {renderIcon(state)}
      </div>
    );
  };

  return (
    <div
      className={`nc-CardNFTVideo relative flex flex-col group ${className}`}
      data-nc-id="CardNFTVideo"
    >
      <div className="relative flex-shrink-0 ">
        {/* AUDIO MEDiA */}
        <VideoForNft nftId={DEMO_NFT_ID} />

        <div className="">
          <NcImage
            containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={featuredImage}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
        </div>

        <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        />

        <ButtonPlayMusicRunningContainer
          className="absolute z-10 bottom-3 left-3"
          nftId={DEMO_NFT_ID}
          renderDefaultBtn={() => renderListenButtonDefault()}
          renderPlayingBtn={() => renderListenButtonDefault("playing")}
          renderLoadingBtn={() => renderListenButtonDefault("loading")}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className={`sm:text-lg font-semibold`}>
            NFT Video #{Math.floor(Math.random() * 1000) + 1000}
          </h2>
          <div className="flex items-center ml-2 space-x-3">
            {renderAvatars()}
            <span className="text-xs text-neutral-700 dark:text-neutral-400">
              1 of 100
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-3.5">
          <Prices labelTextClassName="bg-white dark:bg-neutral-900 " />
          <div className="text-right">
            <span className="block text-xs font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
              Remaining time
            </span>
            <span className="block font-semibold mt-0.5">3h : 15m : 20s</span>
          </div>
        </div>
      </div>

      <Link to={"/nft-details"} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardNFTVideo;
