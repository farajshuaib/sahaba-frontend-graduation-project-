import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import QrCodeImg from "assets/images/qr-code.png";
import metamaskImg from "assets/images/metamask.webp";
import walletconnectImg from "assets/images/walletconnect.webp";
import { toast } from "react-toastify";
import { connectors } from "services/connectors";
import { useWeb3React } from "@web3-react/core";
import { switchNetwork } from "utils/functions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const web3React = useWeb3React();
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSignIn = async (wallet_item: any) => {
    try {
      const result = await switchNetwork();
      if (!result) return;
      web3React.activate(wallet_item.connector);
      localStorage.setItem("provider", wallet_item.provider);
      if (!web3React.error) {
        navigate(-1);
        return;
      }
      toast.error(
        web3React.error?.message ||
          "Connecting to wallet has been failed!, you're connecting to unsupported network! please switch to ethereum network"
      );
    } catch (e: any) {
      toast.error(e || "Connecting to wallet has been failed!");
    }
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Scan_to_connect")}
        </h3>
        <span className="text-sm">
          {t("Open_Coinbase_Wallet_on_your_mobile_phone_and_scan")}
        </span>

        <div className="flex items-center justify-center p-5 mt-4 bg-white border dark:bg-neutral-300 border-neutral-200 dark:border-neutral-700 rounded-xl">
          <NcImage className="w-40" src={QrCodeImg} />
        </div>

        <div className="mt-5 space-x-3">
          <ButtonPrimary type="submit">{t("Install_app")}</ButtonPrimary>
          <ButtonSecondary type="button">{t("Cancel")}</ButtonSecondary>
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
        <title>{t("Connect_your_wallet")}</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("Connect_your_wallet")}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {t("Connect_wallet_desc")}
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
                  <div className="flex items-center w-full gap-5">
                    <NcImage
                      src={plan.img}
                      containerClassName="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 p-2 sm:p-3 bg-white rounded-full overflow-hidden shadow-lg"
                    />
                    <div className={` font-semibold text-xl sm:text-2xl `}>
                      {plan.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- */}
            <div className="pt-2 ">
              <ButtonPrimary
                href={"/"}
                className={`flex flex-1 gap-3 flex-row ${
                  i18n.language == "ar" && "flex-row-reverse"
                }`}
              >
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

                <span className="">{t("Return_Home_Page")}</span>
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
        modalTitle={t("Connect_your_wallet")}
      />
    </div>
  );
};

export default PageConnectWallet;
