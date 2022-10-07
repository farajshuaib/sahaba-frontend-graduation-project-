import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CollectionCard from "./CollectionCard";
import CollectionCard2 from "./CollectionCard2";
import { Link } from "react-router-dom";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "./LoadingScreen";

interface CollectionsSliderProp {
  collections: Collection[];
  cardStyle: string;
}

const CollectionsSlider: React.FC<CollectionsSliderProp> = ({
  collections,
  cardStyle,
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
          perView: 2.15,
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

  const MyCollectionCard =
    cardStyle === "style1" ? CollectionCard : CollectionCard2;

  return (
    <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
      <Heading
        isCenter={false}
        hasNextPrev
        desc="Discover the new creative economy"
      >
        Latest collections
      </Heading>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {collections.map((collection, index: number) => (
            <li key={index} className={`glide__slide`}>
              <MyCollectionCard collection={collection}  />
            </li>
          ))}

          <li className={`glide__slide   `}>
            <Link to={"/collections"} className="relative block group">
              <div className="relative rounded-2xl overflow-hidden h-[410px]">
                <div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
                <div className="absolute flex flex-col items-center justify-center inset-y-6 inset-x-10">
                  <div className="relative flex items-center justify-center">
                    <span className="text-xl font-semibold">Collections</span>
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
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export interface SectionSliderCollectionsProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
}

const SectionSliderCollections: FC<SectionSliderCollectionsProps> = ({
  className = "",
  cardStyle = "style1",
}) => {
  const { fetch, data, loading } = useCrud("/collections");

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`nc-SectionSliderCollections ${className}`}>
      <CollectionsSlider cardStyle={cardStyle} collections={data} />
    </div>
  );
};

export default SectionSliderCollections;
