import React, { useEffect } from "react";
import Avatar from "shared/Avatar/Avatar";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import VerifyIcon from "components/VerifyIcon";
import { useTranslation } from "react-i18next";
import { useCrud } from "hooks/useCrud";
import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import Pagination from "shared/Pagination/Pagination";
import { getUserSlug } from "utils/functions";

interface TabDetailProps {
  nft_id: number;
  owner: UserData;
}

const TabDetail: React.FC<TabDetailProps> = ({ nft_id, owner }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const TABS = ["History", "Owner"];

  const renderTabItem = (item: string) => {
    switch (item) {
      case "History":
        return renderTabBidHistory();
      case "Owner":
        return renderTabOwner();

      default:
        return <></>;
    }
  };

  const renderTabOwner = () => {
    return (
      <Link to={`/author/${owner?.id}`} className="flex items-center py-4">
        <Avatar sizeClass="h-11 w-11" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
          <span className="text-sm">Owner</span>
          <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
            <span>
              {owner?.username || owner?.wallet_address?.slice(0, 8) + "..."}
            </span>
            {owner?.kyc_form?.status == "approved" && (
              <VerifyIcon iconClass="w-4 h-4" />
            )}
          </span>
        </span>
      </Link>
    );
  };

  const renderTabBidHistory = () => {
    const { fetch, loading, errors, meta, data } = useCrud("/transactions");
    const [page, setPage] = React.useState(1);

    useEffect(() => {
      fetch({ page, nft: nft_id });
    }, [page]);

    if (loading) {
      return <LoadingScreen />;
    }

    if (errors) {
      return <ServerError />;
    }

    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {data.map((transaction: Transactions, index) => (
          <li
            key={index}
            className={`relative py-4 ${
              index % 2 === 1 ? "bg-neutradl-100" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Avatar
                imgUrl={transaction.to.profile_photo}
                sizeClass="h-10 w-10"
                radius="rounded-full"
              />
              <h6 className="flex flex-col text-neutral-500 dark:text-neutral-400">
                {renderType(transaction)}
                <p className="mt-1 text-xs">
                  {moment(transaction.created_at).toLocaleString()}
                </p>
              </h6>
            </div>
          </li>
        ))}
        {meta && meta.last_page > 1 && (
          <div className="my-5">
            <Pagination setPage={(page) => setPage(page)} meta={meta} />
          </div>
        )}
      </ul>
    );
  };

  const renderType = (transaction: Transactions) => {
    switch (transaction.type) {
      case "sale": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">{t("sold-by")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.from.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.from)}
            </span>
            <span className="">{t("to")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.to)}
            </span>
            <span className="">{t("return_of")} </span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "mint": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">{t("Minted_by")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.to)}
            </span>
            <span className="">{t("return_of")}</span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "set_for_sale": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">{t("Set_for_Sale_by")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.to)}
            </span>
            <span className="">{t("return_of")}</span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "cancel_sale": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">{t("Cancel_Sale_by")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.to)}
            </span>
            <span className="">{t("for")}</span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "update_price": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">{t("price-updated-by")}</span>
            <span
              onClick={() => {
                navigate(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {getUserSlug(transaction.to)}
            </span>
            <span className="">{t("to")}</span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      default: {
        return <p className="flex items-center gap-1 text-sm"></p>;
      }
    }
  };

  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start gap-3 rounded-full pd-1 ">
          {TABS.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
                  selected
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {TABS.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={
                "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
              }
            >
              {renderTabItem(tab)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabDetail;
