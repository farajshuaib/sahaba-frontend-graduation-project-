import React, { FC, useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import NftMoreDropdown from "components/NftMoreDropdown";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import TabFilters from "components/TabFilters";
import SectionSliderCollections from "components/SectionSliderCollections";
import { useCrud } from "hooks/useCrud";
import { useParams } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { useAppSelector } from "app/hooks";
import ServerError from "components/ServerError";
import { useTranslation } from "react-i18next";
import Heading from "components/Heading/Heading";
import SocialsList from "shared/SocialsList/SocialsList";
import CollectionCollaborator from "components/CollectionCollaborator";

interface CollectionNftsProps {
  collection_id: number | string;
}
const CollectionNfts: React.FC<CollectionNftsProps> = ({ collection_id }) => {
  const [page, setPage] = useState<number>(1);
  const [priceRange, setPriceRange] = useState([0.01, 5.0]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isVerifiedUser, setIsVerifiedUser] = useState<boolean>(false);
  const { fetch, meta, loading, data } = useCrud("/nfts");
  const { t } = useTranslation();

  useEffect(() => {
    fetch({
      page,
      price_range: JSON.stringify(priceRange),
      sort_by: sortBy || undefined,
      is_verified: isVerifiedUser ? "approved" : undefined,
      collection: collection_id || undefined,
    });
  }, [page, collection_id, JSON.stringify(priceRange), sortBy, isVerifiedUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (data?.length == 0) {
    return (
      <Heading isCenter>
        {t("this_collection_doesnt_contain_any_nfts_yet")}
      </Heading>
    );
  }

  return (
    <main>
      {/* TABS FILTER */}
      <TabFilters
        setPriceRange={(val) => setPriceRange(val)}
        setSortBy={(val: string) => setSortBy(val)}
        setIsVerifiedUser={(val: boolean) => setIsVerifiedUser(val)}
      />

      {/* LOOP ITEMS */}
      <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
        {data.map((item: Nft, index) => (
          <CardNFT nft={item} key={index} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
        {meta && meta.last_page > 1 && (
          <Pagination meta={meta} setPage={(page) => setPage(page)} />
        )}
      </div>
    </main>
  );
};

export interface PageCollectionProps {
  className?: string;
}

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {
  const params: any = useParams();
  const { t } = useTranslation();
  const {
    fetchById,
    item: collection,
    loading,
    errors,
  } = useCrud("/collections");
  const userData = useAppSelector((state) => state.account.userData);

  collection as Collection;

  useEffect(() => {
    if (params.id) fetchById(params.id);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>{collection?.name || "Collection"}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={collection?.name} />
        <meta property="og:description" content={collection?.description} />
        <meta property="og:image" content={collection.logo_image} />
        <meta property="twitter:title" content={collection?.name} />
        <meta
          property="twitter:description"
          content={collection?.description}
        />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:image" content={collection.logo_image} />
      </Helmet>

      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={collection?.banner_image}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container relative -mt-14 lg:-mt-20">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row lg:items-center">
            <div className="flex flex-col sm:flex-row md:block sm:items-start sm:justify-between">
              <div className="w-40 sm:w-48 md:w-56 xl:w-60">
                <NcImage
                  src={collection?.logo_image}
                  containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                />
              </div>
              <div className="flex items-center mt-4 space-x-3 sm:justify-center">
                <div className="flex space-x-1.5">
                  <ButtonDropDownShare
                    handleShareOnFacebook={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                        "_blank"
                      );
                    }}
                    handleShareOnTwitter={() => {
                      window.open(
                        `http://www.twitter.com/share?url=${window.location.href}`,
                        "_blank"
                      );
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer md:w-10 md:h-10 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 "
                    panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
                  />
                  <NftMoreDropdown
                    actions={
                      collection?.created_by?.id == userData?.id
                        ? [
                            {
                              id: "addCollaboration",
                              name: t("Add_Collaboration"),
                              icon: "las la-sync",
                            },
                            {
                              id: "editCollection",
                              name: t("edit_collection"),
                              icon: "las la-edit",
                            },
                          ]
                        : [
                            {
                              id: "report",
                              name: t("Report_abuse"),
                              icon: "las la-flag",
                            },
                          ]
                    }
                    collection={collection}
                    containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow mt-5 md:mt-0 md:ml-8 xl:ml-14">
              <div className="max-w-screen-sm ">
                <h2 className="inline-block text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  {collection?.name}
                </h2>
                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {collection?.description}
                </span>
                <div className="mt-4 ">
                  <SocialsList
                    social_links={collection?.social_links}
                    itemClass="block w-7 h-7"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6 xl:mt-8 lg:grid-cols-4 sm:gap-4 xl:gap-6">
                {/* ----- 1 ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Floor_Price")}
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    {parseFloat(collection?.min_price).toFixed(4) || 0} ETH
                  </span>
                  <span className="mt-1 text-xs text-green-500"> --</span>
                </div>

                {/* ----- Volume ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Volume")}
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    {parseFloat(collection?.volume).toFixed(4) || 0} ETH
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {t("total")}
                  </span>
                </div>
                {/* ----- Latest Price ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Latest_Price")}
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    {parseFloat(collection?.max_price).toFixed(4) || 0} ETH
                  </span>
                  <span className="mt-1 text-xs text-green-500"> --</span>
                </div>

                {/* -----Items ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("Items")}
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    {collection?.nfts_count}
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {t("total")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 space-y-20 lg:pb-28 lg:pt-20 lg:space-y-28">
        <CollectionNfts collection_id={collection?.id} />
        {/* === SECTION 5 === */}

        {/*  */}
        {collection.collaborators?.length > 0 && (
          <CollectionCollaborator
            collection_id={collection?.id}
            is_collection_owner={collection.created_by?.id == userData?.id}
            collaborators={collection?.collaborators}
            getCollection={() => fetchById(params.id)}
          />
        )}

        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div>
      </div>
    </div>
  );
};

export default PageCollection;
