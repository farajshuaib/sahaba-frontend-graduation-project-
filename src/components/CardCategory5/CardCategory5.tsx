import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import { COLORS } from "constant";

export interface CardCategory5Props {
  className?: string;
  featuredImage?: string;
  name: string;
  index: number;
  nft_count: number;
  category_id: number 
}



const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  featuredImage ,
  name,
  nft_count,
  category_id,
  index,
}) => {
  return (
    <Link
      to={`/collections/${category_id}`}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={featuredImage}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="absolute inset-0 transition-opacity bg-black opacity-0 group-hover:opacity-100 bg-opacity-10"></span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className={`w-10 h-10 rounded-full ${COLORS[index]}`}></div>
        <div className="">
          <h2
            className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
          >
            {name}
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {nft_count} NFTs
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory5;
