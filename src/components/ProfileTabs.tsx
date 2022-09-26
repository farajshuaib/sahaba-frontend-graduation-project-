import { useAppSelector } from "app/hooks";
import { useCrud } from "hooks/useCrud";
import React, { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Pagination from "shared/Pagination/Pagination";
import { Tab } from "@headlessui/react";
import ArchiveFilterListBox from "components/ArchiveFilterListBox";
import CardNFT from "components/CardNFT";
import CollectionCard from "./CollectionCard";
import CardAuthorBox4 from "./CardAuthorBox4/CardAuthorBox4";

interface ProfileTabsProps {
  user_id: number;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user_id }) => {
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [nftsPage, setNftPage] = useState(1);
  const [likedNftsPage, setLikedNftPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [followersPage, setFollowersPage] = useState(1);
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

  const {
    fetch: getFollowing,
    data: following,
    meta: following_meta,
  } = useCrud(`/users/following/${user_id}`);

  const {
    fetch: getFollowers,
    data: followers,
    meta: followers_meta,
  } = useCrud(`/users/followers/${user_id}`);

  useEffect(() => {
    if (user_id) {
      getFollowing({ page: followingPage });
    }
  }, []);

  useEffect(() => {
    if (user_id) {
      getFollowers({ page: followersPage });
    }
  }, []);

  useEffect(() => {
    if (user_id) {
      getLiked({ page: likedNftsPage });
    }
  }, []);

  useEffect(() => {
    if (user_id) {
      getCollection({ page: collectionsPage });
    }
  }, []);
  useEffect(() => {
    if (user_id) {
      getNfts({ page: nftsPage });
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
                  <CollectionCard key={index} collection={collection} />
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
                  <Pagination
                    setPage={(page) => setCollectionsPage(page)}
                    meta={collections_meta}
                  />
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
                nfts.map((nft: Nft, index: number) => (
                  <CardNFT nft={nft} key={index} />
                ))
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
                {nft_meta && (
                  <Pagination
                    setPage={(page) => setNftPage(page)}
                    meta={nft_meta}
                  />
                )}
                <ButtonPrimary href={"/create-nft"}>Create NFT</ButtonPrimary>
              </div>
            )}
          </Tab.Panel>
          {/* LOOP liked nfts */}
          <Tab.Panel className="">
            <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
              {liked_nfts &&
                liked_nfts.map(({ nft }, index: number) => (
                  <CardNFT nft={nft} key={index} />
                ))}
            </div>
            {liked_nfts && nfts.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {liked_nft_meta && (
                  <Pagination
                    setPage={(page) => setLikedNftPage(page)}
                    meta={liked_nft_meta}
                  />
                )}
              </div>
            )}
          </Tab.Panel>
          {/* LOOP following */}
          <Tab.Panel className="">
            <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-10">
              {following.map(({ user }, index) => (
                <CardAuthorBox4 user={user} key={index} />
              ))}
            </div>
            {following && following.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {following_meta && (
                  <Pagination
                    setPage={(page) => setFollowingPage(page)}
                    meta={following_meta}
                  />
                )}
              </div>
            )}
          </Tab.Panel>
          {/* LOOP followers */}
          <Tab.Panel className="">
            <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-10">
              {followers.map(({ user }, index) => (
                <CardAuthorBox4 user={user} key={index} />
              ))}
            </div>
            {followers && followers.length > 0 && (
              <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {followers_meta && (
                  <Pagination
                    setPage={(page) => setFollowersPage(page)}
                    meta={followers_meta}
                  />
                )}
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default ProfileTabs;
