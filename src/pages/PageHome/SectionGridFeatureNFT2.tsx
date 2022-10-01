import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import CardNFT2 from "components/CardNFT2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import ServerError from "components/ServerError";
import CardNFTMusic from "components/CardNFTMusic";
import CardNFTVideo from "components/CardNFTVideo";

//
export interface SectionGridFeatureNFT2Props {}

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const { fetch, data, loading, errors } = useCrud("/latest-nfts");
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

  if (errors) {
    return <ServerError />;
  }

  const renderNFTComponent = (nft: Nft, index: number) => {
    switch (nft.file_type) {
      case "image":
        return <CardNFT2 nft={nft} key={index} />;
      case "audio":
        return (
          <CardNFTMusic
            key={index}
            nft={nft}
            featuredImage="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          />
        );
      case "video":
        return <CardNFTVideo nft={nft} featuredImage="https://images.unsplash.com/photo-1643101808200-0d159c1331f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      default:
        return <></>;
    }
  };

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
              <div className="col-span-3">
                <h1 className="text-3xl text-center">no result</h1>
              </div>
            ) : (
              data.map((item: Nft, index) => (
                <React.Fragment key={index}>
                  {renderNFTComponent(item, index)}
                </React.Fragment>
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
