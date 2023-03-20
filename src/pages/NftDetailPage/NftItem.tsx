import BlurHiddenNft from "components/BlurHiddenNft";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import LikeButton from "components/LikeButton";
import React from "react";
import NcImage from "shared/NcImage/NcImage";

interface NftItemProps {
  nft: Nft;
}

const NftItem: React.FC<NftItemProps> = ({ nft }) => {
  return (
    <div className="relative">
      <NcImage
        src={nft.file_path}
        contentType={nft.file_type}
        containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
      />

      {nft.status == "hidden" && <BlurHiddenNft />}

      <ItemTypeImageIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" />

      {/* META FAVORITES */}
      <LikeButton
        nft_id={nft.id}
        liked={nft.is_liked}
        like_count={nft.like_count}
        className="absolute right-3 top-3 "
      />
    </div>
  );
};

export default NftItem;
