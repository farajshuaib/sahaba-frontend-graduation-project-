import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import { useAppSelector } from "app/hooks";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  className = "",
  itemClassName = "",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const categories = useAppSelector((state) => state.general.categories);
  const { t } = useTranslation();

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={t("Browse_by_category_desc")} hasNextPrev>
          {t("Browse_by_category")}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {categories &&
              categories.map((item: Category, index: number) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <CardCategory5
                    index={index}
                    category_id={item.id}
                    featuredImage={item.icon}
                    nft_count={item.nfts_count}
                    name={item.name}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCategories;
