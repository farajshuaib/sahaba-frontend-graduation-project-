import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import QrCodeImg from "assets/images/qr-code.png";
import metamaskImg from "assets/images/metamask.webp";
import walletconnectImg from "assets/images/walletconnect.webp";
import walletlinkImg from "assets/images/walletlink.webp";
import fortmaticImg from "assets/images/fortmatic.webp";
import { toast } from "react-toastify";
import { connectors } from "services/connectors";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "services/networks";
import { useAppDispatch } from "app/hooks";
import { connectToWallet } from "app/account/actions";
import { switchNetwork } from "utils/functions";
import { currentNetwork } from "./../constant/index";
import { useHistory } from "react-router-dom";

export interface PageConnectWalletProps {
  className?: string;
}

const plans = [
  {
    name: "Metamask",
    img: metamaskImg,
    connector: connectors.injected,
    provider: "injected",
  },
  {
    name: "Walletconnect",
    connector: connectors.walletConnect,
    provider: "walletConnect",
    img: walletconnectImg,
  },
  // {
  //   name: "Walletlink",
  //   img: walletlinkImg,
  // },
  // {
  //   name: "Fortmatic",
  //   img: fortmaticImg,
  // },
];
const PageConnectWallet: FC<PageConnectWalletProps> = ({ className = "" }) => {
  const history = useHistory();
  const web3React = useWeb3React();
  const [showModal, setShowModal] = useState(false);


  const handleSignIn = async (wallet_item: any) => {
    try {
      const result = await switchNetwork();
      if (!result) return;
      await setTimeout(() => {}, 1000);
      web3React.activate(wallet_item.connector);
      window.localStorage.setItem("provider", wallet_item.provider);
      if (!web3React.error) {
        toast.success("Connecting to wallet has been done successfully!");
        history.push("/");
        return;
      }
      toast.error(
        web3React.error?.message ||
          "Connecting to wallet has been failed!, you're connecting to unsupported network! please switch to BSC"
      );
    } catch (e: any) {
      toast.error(e || "Connecting to wallet has been failed!");
    }
  };

  useEffect(() => {
    if (web3React.account) {
      history.push("/");
    }
  }, [web3React.account]);

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Scan to connect
        </h3>
        <span className="text-sm">
          Open Coinbase Wallet on your mobile phone and scan
        </span>

        <div className="flex items-center justify-center p-5 mt-4 bg-white border dark:bg-neutral-300 border-neutral-200 dark:border-neutral-700 rounded-xl">
          <NcImage className="w-40" src={QrCodeImg} />
        </div>

        <div className="mt-5 space-x-3">
          <ButtonPrimary type="submit">Install app</ButtonPrimary>
          <ButtonSecondary type="button">Cancel</ButtonSecondary>
        </div>
      </form>
    );
  };

  return (
    <div
      className={`nc-PageConnectWallet ${className}`}
      data-nc-id="PageConnectWallet"
    >
      <Helmet>
        <title>Connect Wallet</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Connect your wallet.
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Connect with one of our available wallet providers or create a new
              one.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => handleSignIn(plan)}
                  typeof="button"
                  tabIndex={0}
                  className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                >
                  <div className="flex items-center w-full">
                    <NcImage
                      src={plan.img}
                      containerClassName="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 p-2 sm:p-3 bg-white rounded-full overflow-hidden shadow-lg"
                    />
                    <div
                      className={`ml-4 sm:ml-8 font-semibold text-xl sm:text-2xl `}
                    >
                      {plan.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- */}
            <div className="pt-2 ">
              <ButtonPrimary href={"/"} className="flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">Go Back Home</span>
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-md"
        onCloseModal={() => setShowModal(false)}
        modalTitle="Connect Wallet"
      />
    </div>
  );
};

export default PageConnectWallet;
