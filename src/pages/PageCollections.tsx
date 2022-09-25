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

export interface PageCollectionsProps {
  className?: string;
}

const PageCollections: FC<PageCollectionsProps> = ({ className = "" }) => {
  const params:any = useParams()
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const categories = useAppSelector(state => state.general.categories)
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All NFTs",
    icon: "",
    nfts_count: 0,
    collections_count: 0,
  });
  const { data, loading, fetch, meta } = useCrud("/collections");

  useEffect(() => {
    if(params?.category_id && categories){
      setSelectedCategory(categories?.find(category => category.id == params?.category_id) as Category)
    }
  },[params])


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
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />
      <div className="container">
        <header className="flex flex-col max-w-2xl mx-auto -mt-10 lg:-mt-7">
          <form className="relative w-full " method="post">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="border-0 shadow-lg dark:border"
                id="search-input"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                autoComplete="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="button"
                onClick={submitSearch}
              >
                <i className="text-xl las la-arrow-right"></i>
              </ButtonCircle>
              <span className="absolute text-2xl transform -translate-y-1/2 left-5 top-1/2 md:left-6">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </form>
        </header>
      </div>

      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage
            selectedCategory={selectedCategory}
            setSelectedCategory={(id) => setSelectedCategory(id)}
            no_filter={true}
          />

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

        {/* === SECTION 5 === */}
        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>

        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
};

export default PageCollections;
