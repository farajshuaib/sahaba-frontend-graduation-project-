import React, { FC, useEffect } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import CardNFT2 from "components/CardNFT2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";

//
export interface SectionGridFeatureNFT2Props {}

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const { data, loading, fetch } = useCrud("/nfts");

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="relative nc-SectionGridFeatureNFT2">
      <HeaderFilterSection />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {loading ? (
          <LoadingScreen />
        ) : (
          data.map((item: Nft, index) => <CardNFT2 nft={item} key={index} />)
        )}
      </div>
      <div className="flex items-center justify-center mt-16">
        <ButtonPrimary href={"/search"}>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT2;
