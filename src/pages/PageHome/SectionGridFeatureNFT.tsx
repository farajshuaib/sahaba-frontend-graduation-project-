import React, { FC, useEffect, useState } from "react";
import CardNFT from "components/CardNFT";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import HeaderFilterSection from "components/HeaderFilterSection";
import LoadingScreen from "components/LoadingScreen";
import { useCrud } from "hooks/useCrud";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";

//
export interface SectionGridFeatureNFTProps {}

const SectionGridFeatureNFT: FC<SectionGridFeatureNFTProps> = () => {
  const { data, loading, fetch, meta } = useCrud("/nfts");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All NFTs",
    icon: "",
    nfts_count: 0,
    collections_count: 0,
  });

  useEffect(() => {
    fetch({ category: selectedCategory?.id || "" });
  }, [selectedCategory]);

  return (
    <div className="relative nc-SectionGridFeatureNFT">
      <HeaderFilterSearchPage
        selectedCategory={selectedCategory}
        setSelectedCategory={(id) => setSelectedCategory(id)}
      />
      <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
        {loading ? (
          <LoadingScreen />
        ) : (
          data.map((nft: Nft, index: number) => (
            <CardNFT nft={nft} key={index} />
          ))
        )}
      </div>

      <div className="flex items-center justify-center mt-16">
        <ButtonSecondary href="/search">Show me more</ButtonSecondary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT;
