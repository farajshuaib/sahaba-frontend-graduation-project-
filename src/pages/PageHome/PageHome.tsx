import React from "react";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import { Helmet } from "react-helmet";
import SectionHero from "components/SectionHero/SectionHero";
import Vector1 from "assets/images/Vector1.png";
import SectionLargeSlider from "./SectionLargeSlider";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";
import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
import SectionMagazine8 from "components/SectionMagazine8";

function PageHome() {
  return (
    <div className="relative overflow-hidden nc-PageHome">
      <Helmet>
        <title>Sahaba</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative mt-12 mb-20 space-y-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
        {/* SECTION HERO */}
        <SectionHero
          className="pb-10"
          heading={
            <span>
              Discover 🖼
              <br /> collect, and sell <br /> extraordinary {` `}
              <span className="relative pr-3">
                <img
                  className="absolute w-full bottom-3 -left-1"
                  src={Vector1}
                  alt="Vector1"
                />
                <span className="relative">NFTs</span>
              </span>
            </span>
          }
        />

        {/* SECTION 2 */}
        <SectionHowItWork />
      </div>

      {/* SECTION LAERGE SLIDER */}
      <div className="py-20 bg-neutral-100/80 dark:bg-black/20 lg:py-32">
        <div className="container">
          <SectionLargeSlider />
        </div>
      </div>

      <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
       {/* SECTION 3 */}
       <SectionMagazine8 />

        {/* SECTION */}
        <SectionGridAuthorBox boxCard="box3" />

         {/* SECTION 4 */}
         <SectionSliderCardNftVideo />
        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections cardStyle="style2" />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />

        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>

        {/* SECTION */}
        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />

        {/* SECTION 1 */}
        <SectionSliderCategories />

        {/* SECTION */}
        <SectionVideos />
      </div>
    </div>
  );
}

export default PageHome;
