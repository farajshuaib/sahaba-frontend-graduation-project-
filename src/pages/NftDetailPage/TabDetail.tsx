import React from "react";
import Avatar from "shared/Avatar/Avatar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Tab } from "@headlessui/react";
import VerifyIcon from "components/VerifyIcon";

interface TabDetailProps {
  transactions: Transactions[];
  owner: UserData;
}

const TabDetail: React.FC<TabDetailProps> = ({ transactions, owner }) => {
  const history = useHistory();
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
      <div className="flex items-center py-4">
        <Avatar sizeClass="h-11 w-11" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
          <span className="text-sm">Owner</span>
          <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
            <span>{owner?.username || owner?.wallet_address?.slice(0,8) + "..."}</span>
            {owner?.is_verified && <VerifyIcon iconClass="w-4 h-4" />}
          </span>
        </span>
      </div>
    );
  };

  const renderTabBidHistory = () => {
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {transactions.map((transaction: Transactions, index) => (
          <li
            key={index}
            className={`relative py-4 ${
              index % 2 === 1 ? "bg-neutradl-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Avatar
                imgUrl={transaction.to.profile_photo}
                sizeClass="h-10 w-10"
                radius="rounded-full"
              />
              <h6 className="flex flex-col ml-4 text-neutral-500 dark:text-neutral-400">
                {renderType(transaction)}
                <p className="mt-1 text-xs">
                  {moment(transaction.created_at).toLocaleString()}
                </p>
              </h6>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderType = (transaction: Transactions) => {
    switch (transaction.type) {
      case "sale": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">sold by</span>
            <span
              onClick={() => {
                history.push(`/author/${transaction.from.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {transaction.from.username ||
                transaction.from.wallet_address.slice(0, 8) + "..."}
            </span>
            <span className="">to</span>
            <span
              onClick={() => {
                history.push(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {transaction.to.username ||
                transaction.to.wallet_address.slice(0, 8) + "..."}
            </span>
            <span className="">return of </span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "mint": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">Minted by</span>
            <span
              onClick={() => {
                history.push(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {transaction.to.username ||
                transaction.to.wallet_address.slice(0, 8) + "..."}
            </span>
            <span className="">return of </span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "set_for_sale": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">Set for Sale by</span>
            <span
              onClick={() => {
                history.push(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {transaction.to.username ||
                transaction.to.wallet_address.slice(0, 8) + "..."}
            </span>
            <span className="">return of </span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
      case "update_price": {
        return (
          <p className="flex items-center gap-1 text-sm">
            <span className="">price updated by</span>
            <span
              onClick={() => {
                history.push(`/author/${transaction.to.id}`);
              }}
              className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200"
            >
              {transaction.to.username ||
                transaction.to.wallet_address.slice(0, 8) + "..."}
            </span>
            <span className="">to</span>
            <span className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-200">
              {transaction.price} ETH
            </span>
          </p>
        );
      }
    }
  };

  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start pd-1 space-x-2.5 rounded-full bordedr border-neutral-300 dark:border-neutral-500">
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
