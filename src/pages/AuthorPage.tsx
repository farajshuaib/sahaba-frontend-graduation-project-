import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import authorBanner from "assets/images/authorBanner.png";
import NftMoreDropdown from "components/NftMoreDropdown";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import SocialsList from "shared/SocialsList/SocialsList";
import FollowButton from "components/FollowButton";
import VerifyIcon from "components/VerifyIcon";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import ProfileTabs from "components/ProfileTabs";
import { useCrud } from "hooks/useCrud";
import { useParams } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import { useTranslation } from "react-i18next";
import { copyToClipboard } from "utils/functions";

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.account.userData);
  const params: any = useParams();
  const { fetchById, loading, item, errors } = useCrud("/users");

  useEffect(() => {
    if (params.id) fetchById(params?.id);
  }, [params.id]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (errors) {
    return <ServerError />;
  }

  return (
    <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>{item?.username || "profile"}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item?.username} />
        <meta property="og:description" content={item?.bio} />
        <meta property="og:image" content={item.profile_image} />
        <meta property="twitter:title" content={item?.username} />
        <meta property="twitter:description" content={item?.bio} />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:image" content={item.profile_image} />
      </Helmet>

      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={item.banner_photo || authorBanner}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-32 mt-12 lg:w-44 sm:mt-0">
              <NcImage
                src={item?.profile_image}
                containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
              />
            </div>
            <div className="flex-grow pt-5 md:pt-1 ">
              <div className="max-w-screen-sm ">
                <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  <span>
                    {item?.first_name || item.last_name
                      ? item?.first_name + " " + item.last_name
                      : "anon"}
                  </span>
                  {item?.kyc_form?.status == "approved" && (
                    <VerifyIcon
                      className="ml-2"
                      iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                    />
                  )}
                </h2>
                <h2 className="text-base font-semibold sm:text-lg lg:text-xl text-neutral-500 dark:text-neutral-400">
                  {"@" + item.username}
                </h2>
                <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {item?.wallet_address}
                  </span>
                  <svg
                    onClick={() => {
                      copyToClipboard(item?.wallet_address);
                    }}
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    className="cursor-pointer"
                    fill="none"
                  >
                    <path
                      d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {item?.bio}
                </span>
              </div>
              <div className="mt-4 ">
                <SocialsList
                  social_links={item.social_links}
                  itemClass="block w-7 h-7"
                />
              </div>
            </div>
            <div className="absolute flex flex-row-reverse justify-end md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5">
              {userData?.id != item?.id && (
                <NftMoreDropdown
                  user={item}
                  actions={[
                    {
                      id: "report",
                      name: t("Report_abuse"),
                      icon: "las la-flag",
                    },
                  ]}
                  containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                />
              )}
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
                className="flex items-center justify-center w-8 h-8 mx-2 rounded-full cursor-pointer md:w-10 md:h-10 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800"
                panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
              />

              {userData?.id != item?.id && (
                <FollowButton
                  isFollowing={item.is_followed}
                  user_id={item.id}
                  fontSize="text-sm md:text-base font-medium"
                  sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <ProfileTabs user_id={item?.id} />

        {item?.id != userData?.id && (
          <div className="relative py-16 lg:py-28">
            <BackgroundSection />
            <SectionGridAuthorBox boxCard="box4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
