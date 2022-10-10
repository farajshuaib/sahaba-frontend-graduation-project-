import { t } from "i18next";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import VerifyIcon from "./VerifyIcon";

export interface CollectionCardProps {
  className?: string;
  collection: Collection;
}

const CollectionCard: FC<CollectionCardProps> = ({ className, collection }) => {
  const {t} = useTranslation()
  return (
    <div
      className={`CollectionCard relative p-4 rounded-2xl overflow-hidden h-[410px] flex flex-col group ${className}`}
    >
      <NcImage containerClassName="" src={collection?.banner_image} />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 group-hover:h-full to-transparent "></div>

      <div className="relative mt-auto">
        {/* AUTHOR */}
        <div className="flex items-center">
          <Avatar
            imgUrl={collection?.created_by?.profile_photo}
            sizeClass="h-6 w-6"
            containerClassName="ring-2 ring-white"
          />
          <div className="ml-2 text-xs text-white">
            <span className="font-normal">{t("by")}</span>
            {` `}
            <span className="font-medium">
              {collection?.created_by?.username}
            </span>
          </div>
          {collection?.created_by?.is_verified && (
            <VerifyIcon iconClass="w-4 h-4" />
          )}
        </div>
        {/* TITLE */}
        <h2 className="font-semibold text-3xl mt-1.5 text-white">
          {collection?.name}
        </h2>
        {/* LISTS */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {collection && collection?.nfts?.length > 0 && (
            <>
              {collection.nfts.map((nft) => (
                <NcImage
                  key={nft.id}
                  containerClassName="w-full h-20 rounded-xl overflow-hidden"
                  src={nft.file_path}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Link
        to={`/collection/${collection?.id}`}
        className="absolute inset-0"
      ></Link>
    </div>
  );
};

export default CollectionCard;
