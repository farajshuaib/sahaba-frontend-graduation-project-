import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";
import CollectionCard2 from "components/CollectionCard2";
import SectionGridFeatureNFT2 from "./PageHome/SectionGridFeatureNFT2";
import { useParams } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";

export interface PageCollectionsProps {
  className?: string;
}

const PageCollections: FC<PageCollectionsProps> = ({ className = "" }) => {
  const params: any = useParams();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const categories = useAppSelector((state) => state.general.categories);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All NFTs",
    icon: "",
    nfts_count: 0,
    collections_count: 0,
  });
  const { data, loading, fetch, meta } = useCrud("/collections");

  useEffect(() => {
    if (params?.category_id && categories) {
      setSelectedCategory(
        categories?.find(
          (category) => category.id == params?.category_id
        ) as Category
      );
    }
  }, [params]);

  useEffect(() => {
    fetch({ page, search, category: selectedCategory?.id || "" });
  }, [page, selectedCategory]);

  const submitSearch = () => {
    fetch({ page, search, category: selectedCategory?.id || "" });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollections"
    >
      <Helmet>
        <title>Collections</title>
      </Helmet>

      <div
        className={`nc-HeadBackgroundCommon w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />

      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* FILTER */}
          <h1 className="my-8 text-5xl font-bold text-white">Collections</h1>

          {loading ? (
            <LoadingScreen />
          ) : (
            <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:mt-10">
              {data.map((collection: Collection, index) => (
                <CollectionCard2 collection={collection} key={index} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {meta && (
              <Pagination meta={meta} setPage={(page) => setPage(page)} />
            )}
            {meta && page < meta?.last_page && (
              <ButtonPrimary onClick={() => setPage(page + 1)}>
                Show me more
              </ButtonPrimary>
            )}
          </div>
        </main>

        <SectionSliderCategories />
      </div>
    </div>
  );
};

export default PageCollections;
