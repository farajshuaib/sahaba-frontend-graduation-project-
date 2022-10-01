import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardNFTVideo from "./CardNFTVideo";
import { Link } from "react-router-dom";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "./LoadingScreen";
import ServerError from "./ServerError";

export interface SectionSliderCardNftVideoProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  nfts?: Nft[];
}

const ImplementVideos: React.FC<SectionSliderCardNftVideoProps> = ({
  itemClassName,
  className,
  nfts,
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.3,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);


  return (
    <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
      <Heading desc="Click on play icon and enjoy NTFs video" hasNextPrev>
        Explore NFTs Video
      </Heading>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {nfts &&
            nfts.map((nft: Nft, index: number) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardNFTVideo nft={nft} />
              </li>
            ))}
          <li className={`glide__slide  ${itemClassName}`}>
            <Link to={"/search"} className="relative block group">
              <div className="flex w-full h-0 aspect-w-16 aspect-h-9 rounded-3xl bg-neutral-100 dark:bg-neutral-800"></div>
              <div className="absolute flex flex-col items-center justify-center inset-y-6 inset-x-10">
                <div className="relative flex items-center justify-center">
                  <span className="text-xl font-semibold">NFTs Video</span>
                  <svg
                    className="absolute w-5 h-5 ml-2 transition-transform rotate-45 left-full group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20.4999V3.66992"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="mt-1 text-sm">Show me more</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SectionSliderCardNftVideo: FC<SectionSliderCardNftVideoProps> = ({
  className = "",
  itemClassName = "",
}) => {
  const { fetch, data, loading, errors } = useCrud("/latest-nfts?type=video");

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <div className={`nc-SectionSliderCardNftVideo ${className}`}>
      <ImplementVideos
        itemClassName={itemClassName}
        className={className}
        nfts={data}
      />
    </div>
  );
};

export default SectionSliderCardNftVideo;
