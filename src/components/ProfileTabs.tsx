import { useAppSelector } from "app/hooks";
import { useCrud } from "hooks/useCrud";
import React, { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Pagination from "shared/Pagination/Pagination";
import { Tab } from "@headlessui/react";
import FollowButton from "components/FollowButton";
import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
import ArchiveFilterListBox from "components/ArchiveFilterListBox";
import CardNFT from "components/CardNFT";
import CollectionCard from "./CollectionCard";

interface ProfileTabsProps {
  user_id: number;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user_id }) => {
  const userData = useAppSelector((state) => state.account.userData);

  let [categories] = useState([
    "Collections",
    "tokens",
    "Liked",
    "Following",
    "Followers",
  ]);

  const {
    fetch: getCollection,
    data: collections,
    meta: collections_meta,
  } = useCrud(`/users/collections/${user_id}`);

  const {
    fetch: getNfts,
    data: nfts,
    meta: nft_meta,
  } = useCrud(`/users/nfts/${user_id}`);

  const {
    fetch: getLiked,
    data: liked_nfts,
    meta: liked_nft_meta,
  } = useCrud(`/users/liked-nfts/${user_id}`);

  useEffect(() => {
    if (user_id) {
      getCollection();
      getNfts();
      getLiked();
    }
  }, []);

  return (
    <main>
      <Tab.Group>
        <div className="flex flex-col justify-between lg:flex-row ">
          <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2 ">
            {categories.map((item) => (
              <Tab key={item} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                      selected
                        ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                        : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                    } `}
                  >
                    {item}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <div className="flex items-end justify-end mt-5 lg:mt-0">
            <ArchiveFilterListBox />
          </div>
        </div>
        <Tab.Panels>
          {/* LOOP collections */}
          <Tab.Panel className="">
            <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:mt-10">
              {collections && collections.length > 0 ? (
                collections.map((collection: Collection, index) => (
                  <CollectionCard
                    key={index}
                    collection={collection}
                    imgs={[
                      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
                      "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                      "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                      "https://images.unsplash.com/photo-1627037558426-c2d07beda3af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                    ]}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-start col-span-3 mx-auto">
                  <h3 className="mb-5 text-3xl font-medium">
                    You didn't create any collection yet
                  </h3>
                  <ButtonPrimary href={"/create-collection"}>
                    Create collection
                  </ButtonPrimary>
                </div>
              )}
            </div>

            {collections && collections.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {collections_meta && (
                  <Pagination setPage={() => {}} meta={collections_meta} />
                )}
                <ButtonPrimary href={"/create-collection"}>
                  Create collection
                </ButtonPrimary>
              </div>
            )}
          </Tab.Panel>
          {/* LOOP nfts */}
          <Tab.Panel className="">
            <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
              {nfts && nfts.length > 0 ? (
                nfts.map((nft: Nft, index) => <CardNFT nft={nft} key={index} />)
              ) : (
                <div className="flex flex-col items-center justify-start col-span-2 mx-auto lg:col-span-3 xl:col-span-4">
                  <h3 className="mb-5 text-3xl font-medium">
                    You didn't create any NFTs yet
                  </h3>
                  <ButtonPrimary href={"/create-nft"}>Create NFT</ButtonPrimary>
                </div>
              )}
            </div>
            {nfts && nfts.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {nft_meta && <Pagination setPage={() => {}} meta={nft_meta} />}
                <ButtonPrimary href={"/create-nft"}>Create NFT</ButtonPrimary>
              </div>
            )}
          </Tab.Panel>
          {/* LOOP liked nfts */}
          <Tab.Panel className="">
            <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
              {liked_nfts &&
                liked_nfts.map((nft: Nft, index: number) => (
                  <CardNFT nft={nft} isLiked key={index} />
                ))}
            </div>
            {liked_nfts && nfts.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {liked_nft_meta && (
                  <Pagination setPage={() => {}} meta={liked_nft_meta} />
                )}
              </div>
            )}
          </Tab.Panel>
          {/* LOOP following */}
          <Tab.Panel className="">
            <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-10">
              {Array.from("11111111").map((_, index) => (
                <CardAuthorBox3 following key={index} />
              ))}
            </div>
          </Tab.Panel>
          {/* LOOP followers */}
          <Tab.Panel className="">
            <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-10">
              {Array.from("11111111").map((_, index) => (
                <CardAuthorBox3 following={false} key={index} />
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default ProfileTabs;
