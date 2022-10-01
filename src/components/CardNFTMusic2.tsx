import ButtonPlayMusicRunningContainer from "pages/ButtonPlayMusicRunningContainer";
import { nftsAbstracts } from "contains/fakeData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import AudioForNft from "./AudioForNft";
import Prices from "./Prices";
import VerifyIcon from "./VerifyIcon";

export interface CardNFTMusic2Props {
  className?: string;
  featuredImage?: string;
  nft: Nft;
}

const CardNFTMusic2: FC<CardNFTMusic2Props> = ({
  className = "",
  nft,
  featuredImage = nftsAbstracts[18],
}) => {
  const renderIcon = (state?: "loading" | "playing") => {
    switch (state) {
      case "loading":
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
            ></path>
            <path
              fill="currentColor"
              d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
            ></path>
            <path
              fill="currentColor"
              d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
            ></path>
          </svg>
        );

      case "playing":
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
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

      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
  };

  const renderDefaultBtnListen = (state?: "loading" | "playing") => {
    return (
      <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer sm:w-11 sm:h-11 dark:bg-neutral-900/50 text-primary-6000 dark:text-primary-200">
        {renderIcon(state)}
      </span>
    );
  };

  return (
    <div
      className={`nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="CardNFTMusic2"
    >
      <Link to={`/nft-details/${nft.id}`} className="flex flex-grow space-x-4">
        <div className="relative w-16 sm:w-24">
          <NcImage
            containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
            src={featuredImage}
          />
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h2 className={`block font-medium sm:text-lg`}>{nft.title}</h2>
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
          <div className=" flex items-center pt-3 mt-1.5">
            <Prices
              price={`${nft.price} ETH`}
              labelText="Price"
              className="sm:ml-3.5"
              contentClass="py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold"
              labelTextClassName="bg-neutral-100 dark:bg-neutral-800 "
            />
          </div>
        </div>
      </Link>

      <ButtonPlayMusicRunningContainer
        nftId={nft.id.toString()}
        className="flex items-center"
        renderDefaultBtn={() => renderDefaultBtnListen()}
        renderLoadingBtn={() => renderDefaultBtnListen("loading")}
        renderPlayingBtn={() => renderDefaultBtnListen("playing")}
      ></ButtonPlayMusicRunningContainer>

      {/* AUDIO MEDiA */}
      <AudioForNft
        src={nft.file_path}
        className="absolute opacity-0"
        nftId={nft.id.toString()}
      />
    </div>
  );
};

export default CardNFTMusic2;
