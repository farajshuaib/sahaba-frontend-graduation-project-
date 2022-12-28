import { useAppSelector } from "app/hooks";
import { useCrud } from "hooks/useCrud";
import React, { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Pagination from "shared/Pagination/Pagination";
import { Tab } from "@headlessui/react";
import CardNFT from "components/CardNFT";
import CardAuthorBox4 from "./CardAuthorBox4/CardAuthorBox4";
import LoadingScreen from "./LoadingScreen";
import ServerError from "./ServerError";
import CollectionCard2 from "./CollectionCard2";
import { useTranslation } from "react-i18next";

interface ProfileTabsProps {
  user_id: number;
}

interface NftsTabs extends ProfileTabsProps {
  api: string;
  route_link: keyof LocationStates;
  empty_data_current_user_message: string;
  empty_data_message: string;
  button_label: string;
}

interface FollowTabsProps extends ProfileTabsProps {
  api: string;
  empty_data_current_user_message: string;
  empty_data_message: string;
}

const Collections: React.FC<ProfileTabsProps> = ({ user_id }) => {
  const [page, setPage] = useState(1);
  const { fetch, data, meta, loading, errors } = useCrud(
    `/users/collections/${user_id}`
  );
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.account.userData);

  useEffect(() => {
    if (user_id) {
      fetch({ page });
    }
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <React.Fragment>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:mt-10">
        {data && data.length > 0 ? (
          data.map((collection: Collection, index) => (
            <CollectionCard2 key={index} collection={collection} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-start col-span-3 mx-auto">
            <h3 className="my-12 text-3xl font-medium">
              {userData?.id == user_id
                ? t("You_didnt_create_any_collection_yet")
                : t("This_author_doesnt_create_any_collection_yet")}
            </h3>
            {userData?.id == user_id && (
              <ButtonPrimary href={"/create-collection"}>
                {t("Create_collection")}
              </ButtonPrimary>
            )}
          </div>
        )}
      </div>

      {data && data.length > 0 && (
        <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          {meta && meta.last_page > 1 && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
          {userData?.id == user_id && (
            <ButtonPrimary href={"/create-collection"}>
              {t("Create_collection")}
            </ButtonPrimary>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const Nfts: React.FC<NftsTabs> = ({
  user_id,
  api,
  route_link,
  empty_data_current_user_message,
  button_label,
  empty_data_message,
}) => {
  const [page, setPage] = useState(1);
  const { fetch, data, meta, loading, errors } = useCrud(`${api}/${user_id}`);
  const userData = useAppSelector((state) => state.account.userData);

  useEffect(() => {
    if (user_id) {
      fetch({ page });
    }
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <React.Fragment>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:mt-10">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <CardNFT nft={item.price ? item : item.nft} key={index} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-start col-span-3 mx-auto">
            <h3 className="my-12 text-3xl font-medium">
              {userData?.id == user_id
                ? empty_data_current_user_message
                : empty_data_message}
            </h3>
            {userData?.id == user_id && (
              <ButtonPrimary href={route_link}>{button_label}</ButtonPrimary>
            )}
          </div>
        )}
      </div>

      {data && data.length > 0 && (
        <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          {meta && meta.last_page > 1 && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
          {userData?.id == user_id && (
            <ButtonPrimary href={route_link}>{button_label}</ButtonPrimary>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const FollowTab: React.FC<FollowTabsProps> = ({
  user_id,
  api,
  empty_data_current_user_message,
  empty_data_message,
}) => {
  const [page, setPage] = useState(1);
  const { fetch, data, meta, loading, errors } = useCrud(`${api}/${user_id}`);
  const userData = useAppSelector((state) => state.account.userData);

  useEffect(() => {
    if (user_id) {
      fetch({ page });
    }
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }
  return (
    <React.Fragment>
      <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-10">
        {data && data.length > 0 ? (
          data.map((data, index) => (
            <CardAuthorBox4 user={data?.user || data} key={index} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-start col-span-4 mx-auto">
            <h3 className="my-12 mb-5 text-3xl font-medium">
              {userData?.id == user_id
                ? empty_data_current_user_message
                : empty_data_message}
            </h3>
          </div>
        )}
      </div>
      {data && data.length > 0 && (
        <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          {meta && meta.last_page > 1 && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
        </div>
      )}
    </React.Fragment>
  );
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user_id }) => {
  const { t } = useTranslation();
  
  let categories = [
    t("Collections"),
    t("Created_NFTs"),
    t("owned_NFTs"),
    t("Liked"),
    t("Followings"),
    t("Followers"),
  ];

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
        </div>
        <Tab.Panels>
          {/* LOOP collections */}
          <Tab.Panel className="">
            <Collections user_id={user_id} />
          </Tab.Panel>
          {/* LOOP created nfts */}
          <Tab.Panel className="">
            <Nfts
              button_label={t("create_NFT")}
              empty_data_current_user_message={t(
                "you_didnt_create_any_NFT_yet"
              )}
              empty_data_message={t("this_author_doesnt_create_any_nft_yet")}
              route_link="/create-nft"
              api={"/users/created-nfts"}
              user_id={user_id}
            />
          </Tab.Panel>
          {/* LOOP nfts */}
          <Tab.Panel className="">
            <Nfts
              button_label={t("explore") + " NFTs"}
              empty_data_current_user_message={t("you_didnt_buy_any_NFT_yet")}
              empty_data_message={t("this author doesnt_own_any_nft")}
              route_link="/search"
              api={"/users/owned-nfts"}
              user_id={user_id}
            />
          </Tab.Panel>

          {/* LOOP liked nfts */}
          <Tab.Panel className="">
            <Nfts
              button_label={t("explore") + " NFTs"}
              empty_data_current_user_message={t("You_didnt_like_any_NFT_yet")}
              empty_data_message={t("This_author_doesnt_like_any_nft_yet")}
              route_link="/search"
              api={"/users/liked-nfts"}
              user_id={user_id}
            />
          </Tab.Panel>
          {/* LOOP following */}
          <Tab.Panel className="">
            <FollowTab
              empty_data_current_user_message={t(
                "you_didnt_follow_any_author_yet"
              )}
              empty_data_message={t("this_author_doesnt_follow_anyone_yet")}
              api="/users/following"
              user_id={user_id}
            />
          </Tab.Panel>
          {/* LOOP followers */}
          <Tab.Panel className="">
            <FollowTab
              empty_data_current_user_message={t(
                "you_didnt_get_follow_by_anyone_yet"
              )}
              empty_data_message={t("this_author_has_no_followers")}
              api="/users/followers"
              user_id={user_id}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default ProfileTabs;
