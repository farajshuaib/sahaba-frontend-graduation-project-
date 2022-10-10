import React, { FC, useEffect, useState } from "react";
import CardNFT2 from "components/CardNFT2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import ServerError from "components/ServerError";
import Heading from "components/Heading/Heading";
import { useTranslation } from "react-i18next";

//
export interface SectionGridFeatureNFT2Props {}

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const { fetch, data, loading, errors } = useCrud("/latest-nfts");
  const [sortBy, setSortBy] = useState<string>("");
  const [isVerifiedUser, setIsVerifiedUser] = useState<boolean>();
  const [priceRange, setPriceRange] = useState([0.01, 5.0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All NFTs",
    icon: "",
    nfts_count: 0,
    collections_count: 0,
  });
  const {t}= useTranslation()

  useEffect(() => {
    fetch({
      page: 1,
      search: "",
      category: selectedCategory?.id || "",
      price_range: priceRange,
      sort_by: sortBy,
      is_verified: isVerifiedUser,
    });
  }, [selectedCategory, JSON.stringify(priceRange), sortBy, isVerifiedUser]);

  if (errors) {
    return <ServerError />;
  }

  return (
    <div className="relative nc-SectionGridFeatureNFT2">
      <Heading isCenter={false}>{t("Latest_NFTs")}</Heading>
      <HeaderFilterSearchPage
        selectedCategory={selectedCategory}
        setPriceRange={(val) => setPriceRange(val)}
        setSelectedCategory={(id) => setSelectedCategory(id)}
        setSortBy={(val) => setSortBy(val)}
        setIsVerifiedUser={(val) => setIsVerifiedUser(val)}
      />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {data.length == 0 ? (
              <div className="col-span-3">
                <h1 className="text-3xl text-center">{t("No_result")}</h1>
              </div>
            ) : (
              data.map((nft: Nft, index) => (
                <React.Fragment key={index}>
                  <CardNFT2 nft={nft} key={index} />
                </React.Fragment>
              ))
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center mt-16">
        <ButtonPrimary href={"/search"}>{t("Show_me_more")}</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT2;
