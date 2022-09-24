import { nftsImgs, _getPersonNameRd } from "contains/fakeData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import VerifyIcon from "./VerifyIcon";

export interface CollectionCard2Props {
  className?: string;
  imgs?: string[];
  collection?: Collection;
}

const CollectionCard2: FC<CollectionCard2Props> = ({
  className,
  collection,
}) => {
  return (
    <div className={`CollectionCard2 group relative ${className}`}>
      <div className="relative flex flex-col overflow-hidden rounded-2xl">
        <NcImage
          containerClassName="aspect-w-8 aspect-h-5"
          src={collection?.banner_image}
        />
        <div className="grid grid-cols-3 gap-1.5 mt-1.5">
          {collection?.nfts.map((nft: Nft, index: number) => (
            <NcImage
              key={index}
              containerClassName="w-full h-28"
              src={nft.file_path}
            />
          ))}
        </div>
      </div>
      <div className="relative mt-5 ">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold transition-colors group-hover:text-primary-500">
          {collection?.name}
        </h2>
        {/* AUTHOR */}
        <div className="flex justify-between mt-2">
          <div className="flex items-center truncate">
            <Avatar
              imgUrl={collection?.created_by?.profile_photo}
              sizeClass="h-6 w-6"
            />
            <div className="ml-2 text-sm truncate">
              <span className="hidden font-normal sm:inline-block">
                Creator
              </span>
              {` `}
              <span className="font-medium">
                {collection?.created_by?.username}
              </span>
            </div>
            {collection?.created_by?.is_verified && (
              <VerifyIcon iconClass="w-4 h-4" />
            )}
          </div>
          <span className="mb-0.5 ml-2 inline-flex justify-center items-center px-2 py-1.5 border-2 border-secondary-500 text-secondary-500 rounded-md text-xs !leading-none font-medium">
            {collection?.nfts_count} Items
          </span>
        </div>
      </div>
      <Link
        to={`/collection/${collection?.id}`}
        className="absolute inset-0 "
      ></Link>
    </div>
  );
};

export default CollectionCard2;
