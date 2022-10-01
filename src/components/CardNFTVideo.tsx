import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import ButtonPlayMusicRunningContainer from "pages/ButtonPlayMusicRunningContainer";
import VideoForNft from "./VideoForNft";
import VerifyIcon from "./VerifyIcon";
import useCountDownTime from "hooks/useCountDownTime";

export interface CardNFTVideoProps {
  className?: string;
  nft: Nft;
  featuredImage?: string;
}

const CardNFTVideo: FC<CardNFTVideoProps> = ({
  className = "",
  nft,
  featuredImage = "https://images.unsplash.com/photo-1643101808200-0d159c1331f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
}) => {
  const timeLeft = useCountDownTime(nft?.sale_end_at);

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
        <VideoForNft src={nft.file_path} nftId={nft.id.toString()} />

        <div className="">
          <NcImage
            containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={featuredImage}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
        </div>

        <LikeButton
          liked={nft.is_liked}
          like_count={nft.like_count}
          nft_id={nft.id}
          className="absolute top-3 right-3 z-10 !h-9"
        />

        <ButtonPlayMusicRunningContainer
          className="absolute z-10 bottom-3 left-3"
          nftId={nft.id.toString()}
          renderDefaultBtn={() => renderListenButtonDefault()}
          renderPlayingBtn={() => renderListenButtonDefault("playing")}
          renderLoadingBtn={() => renderListenButtonDefault("loading")}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className={`sm:text-lg font-semibold`}>{nft.title}</h2>
          <div className="flex items-center">
            <Avatar
              imgUrl={nft?.creator?.profile_photo}
              sizeClass="h-6 w-6"
              containerClassName="ring-2 ring-white"
            />
            <div className="ml-2 text-xs text-white">
              <span className="font-normal">by</span>
              {` `}
              <span className="font-medium">{nft?.creator?.username}</span>
            </div>
            {nft?.creator?.is_verified && <VerifyIcon iconClass="w-4 h-4" />}
          </div>
        </div>

        <div className="flex justify-between items-end mt-3.5">
          <Prices
            price={`${nft.price} ETH`}
            labelTextClassName="bg-white dark:bg-neutral-900 "
          />
          <div className="text-right">
            <span className="block text-xs font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
              sale end at
            </span>
            <span className="block font-semibold mt-0.5">
              {timeLeft.days}:d {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
              {timeLeft.seconds}s
            </span>
          </div>
        </div>
      </div>

      <Link to={`/nft-details/${nft.id}`} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardNFTVideo;
