import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import CardNFT2 from "components/CardNFT2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";

//
export interface SectionGridFeatureNFT2Props {}

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const { data, loading, fetch } = useCrud("/nfts");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All NFTs",
    icon: "",
    nfts_count: 0,
    collections_count: 0,
  });

  useEffect(() => {
    fetch({ page: 1, category: selectedCategory?.id || "" });
  }, [selectedCategory]);

  return (
    <div className="relative nc-SectionGridFeatureNFT2">
      {/* <HeaderFilterSection /> */}
      <HeaderFilterSearchPage
        selectedCategory={selectedCategory}
        setSelectedCategory={(id) => setSelectedCategory(id)}
      />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {data.length == 0 ? (
              <div className="col-span-3"><h1 className="text-3xl text-center">no result</h1></div>
            ) : (
              data.map((item: Nft, index) => (
                <CardNFT2 nft={item} key={index} />
              ))
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center mt-16">
        <ButtonPrimary href={"/search"}>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT2;
