import { Popover, Transition } from "@headlessui/react";
import { useWeb3React } from "@web3-react/core";
import { logout } from "app/account/actions";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { formatEther } from "ethers/lib/utils";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import { usdPrice } from "utils/functions";

export default function AvatarDropdown() {
  const { t } = useTranslation();
  const { deactivate, library, account } = useWeb3React();
  const userData: UserData = useAppSelector((state) => state.account.userData);
  const [balance, setBalance] = useState<string>("");
  const dispatch = useAppDispatch();

  const disconnect = async () => {
    await dispatch(logout());
    await deactivate();
  };

  const getAccountBalance = async () => {
    if (!account) return;
    const balance = await library.getBalance(account);
    setBalance(formatEther(balance));
  };

  useEffect(() => {
    getAccountBalance();
  }, []);

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar
                imgUrl={userData?.profile_photo}
                sizeClass="w-8 h-8 sm:w-9 sm:h-9"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden shadow-lg rounded-3xl ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 px-6 bg-white dark:bg-neutral-800 py-7">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        imgUrl={userData?.profile_photo}
                        sizeClass="w-12 h-12"
                      />

                      <div className="flex-grow">
                        <h4 className="font-semibold">
                          {userData?.username || "anon"}
                        </h4>
                        <p className="text-xs mt-0.5">
                          {userData.wallet_address?.slice(0, 10) +
                            "..." +
                            userData.wallet_address?.slice(10, 15)}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex flex-col items-baseline flex-1 gap-1 p-2 mt-2 border-2 border-green-500 sm:flex-row rounded-xl">
                      <span className="absolute bottom-full translate-y-2 py-1 px-1.5 bg-white dark:bg-neutral-800 text-sm text-neutral-500 dark:text-neutral-400">
                        {t("balance")}
                      </span>
                      <span className="font-semibold text-green-500 ">
                        {parseFloat(balance).toFixed(5)} {" ETH "}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {"≈ " + usdPrice(+balance)}
                      </span>
                    </div>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 1 --------------------- */}
                    <Link
                      to={`/author/${userData?.id}`}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("My_Profile")}
                        </p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={"/account"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <i className="text-2xl bx bx-cog"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{t("settings")}</p>
                      </div>
                    </Link>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 2 --------------------- */}
                    <button
                      onClick={disconnect}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 12H3.62"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("Disconnect")}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
