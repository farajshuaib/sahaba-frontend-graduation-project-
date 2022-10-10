import React from "react";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { Helmet } from "react-helmet";
import SectionLargeSlider from "./SectionLargeSlider";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden nc-PageHome">
      <Helmet>
        <title>Sahaba NFT</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION LAERGE SLIDER */}
      <div className="py-14 lg:py-16">
        <div className="container">
          <SectionLargeSlider />
        </div>
      </div>

      <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div>

        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>

        <SectionGridAuthorBox boxCard="box3" />

        {/* SECTION 1 */}
        <SectionSliderCategories />
      </div>
    </div>
  );
};

export default Home;
