import React from "react";
import Avatar from "shared/Avatar/Avatar";
import moment from "moment";
import { useHistory } from "react-router-dom";

interface TabDetailProps {
  transactions: Transactions[];
}

const TabDetail: React.FC<TabDetailProps> = ({ transactions }) => {
  const history = useHistory();
  return (
    <div className="w-full pdx-2 sm:px-0">
      <span
        className={`px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 mb-5 inline-block`}
      >
        {"History"}
      </span>
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
                userName={transaction.to.username}
              />
              <span className="flex flex-col ml-4 text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1 text-sm">
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
                </span>
                <span className="mt-1 text-xs">
                  {moment(transaction.created_at).format("YYYY-MM-DD HH:MM")}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabDetail;
