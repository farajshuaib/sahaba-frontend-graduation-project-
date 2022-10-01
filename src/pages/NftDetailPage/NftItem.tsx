import AudioForNft from "components/AudioForNft";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import LikeButton from "components/LikeButton";
import VideoForNft from "components/VideoForNft";
import { nftsAbstracts } from "contains/fakeData";
import ButtonPlayMusicRunningContainer from "pages/ButtonPlayMusicRunningContainer";
import React from "react";
import NcImage from "shared/NcImage/NcImage";
import musicWave from "../../assets/images/musicWave.png";

interface NftItemProps {
  nft: Nft;
  featuredImage: string;
}

const NftItem: React.FC<NftItemProps> = ({
  nft,
  featuredImage = nftsAbstracts[18],
}) => {
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
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer`}
      >
        {renderIcon(state)}
      </div>
    );
  };
  return (
    <div className="relative">
      {nft?.file_type == "audio" && (
        <AudioForNft src={nft.file_path} nftId={nft.id.toString()} />
      )}
      {nft?.file_type == "video" && (
        <VideoForNft src={nft.file_path} nftId={nft.id.toString()} />
      )}
      <NcImage
        src={nft.file_type == "image" ? nft.file_path : featuredImage}
        containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
      />
      {/* META TYPE */}
      {nft?.file_type == "video" ? (
        <ItemTypeVideoIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" />
      ) : nft?.file_type == "image" ? (
        <ItemTypeImageIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" />
      ) : null}

      {nft?.file_type == "audio" && (
        <div className="w-11/12 max-w-[360px] transform -translate-y-16 p-3 rounded-r-lg bg-gray-700  relative z-50">
          <div className={`px-5 flex items-center space-x-4 relative `}>
            <div className={`flex-grow flex justify-center`}>
              <img src={musicWave} alt="musicWave" />
            </div>
            <ButtonPlayMusicRunningContainer
              className="relative z-10"
              nftId={nft.id.toString()}
              renderDefaultBtn={() => renderListenButtonDefault()}
              renderPlayingBtn={() => renderListenButtonDefault("playing")}
              renderLoadingBtn={() => renderListenButtonDefault("loading")}
            />
          </div>
        </div>
      )}

      {/* META FAVORITES */}
      <LikeButton
        nft_id={nft.id}
        liked={nft.is_liked}
        like_count={nft.like_count}
        className="absolute right-3 top-3 "
      />

      {nft.file_type == "video" && (
        <ButtonPlayMusicRunningContainer
          className="absolute z-10 bottom-3 left-3"
          nftId={nft.id.toString()}
          renderDefaultBtn={() => renderListenButtonDefault()}
          renderPlayingBtn={() => renderListenButtonDefault("playing")}
          renderLoadingBtn={() => renderListenButtonDefault("loading")}
        />
      )}
    </div>
  );
};

export default NftItem;
