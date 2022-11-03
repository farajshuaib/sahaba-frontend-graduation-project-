import React, { FC, useEffect } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Navigation from "shared/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "app/hooks";
import LocalesDropDown from "./LocalesDropDown";
import { useTranslation } from "react-i18next";
import { getNotifications } from "app/general/actions";
import { Alert } from "flowbite-react";
import { useWeb3React } from "@web3-react/core";

const Alerts: FC = () => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const userData: UserData = useAppSelector((state) => state.account.userData);
  return (
    <>
      {chainId && chainId == 5 && (
        <Alert color="info">
          <span className="block w-screen font-medium text-center">
            {t("you_are_on_goerli")}
          </span>
        </Alert>
      )}
      {!window.ethereum && (
        <Alert color="warning">
          <span className="block w-screen font-medium text-center">
            <span>{t("no_provider")}</span>
            {" "}
            <a href="https://metamask.io/download/" className="font-bold underline" target="_blank">
              {t("install_metamask")}
            </a>
          </span>
        </Alert>
      )}

      {userData?.status == "suspended" && (
        <Alert color="warning">
          <span className="block w-screen font-medium text-center">
            {t("account_suspended")}
          </span>
        </Alert>
      )}
    </>
  );
};

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.account.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(getNotifications(1));
    }
  }, [userData]);

  return (
    <div className="relative z-40 w-full pb-28 nc-HeaderLogged">
      {/* NAV */}
      <div className={`nc-MainNav2Logged fixed w-full z-30 nav-blur-bg  `}>
        <Alerts />

        <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
          <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
            <Logo />
          </div>
          <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
            <div className="items-center hidden space-x-2 xl:flex">
              <Navigation />
              <div className="hidden h-6 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
              <div className="flex">
                {userData && <NotifyDropdown />}
                <LocalesDropDown />
              </div>
              {userData && (
                <ButtonPrimary
                  href={"/create-nft"}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  {t("Create")}
                </ButtonPrimary>
              )}
              {!userData && (
                <ButtonPrimary
                  href={"/connect-wallet"}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  {t("Connect_wallet")}
                </ButtonPrimary>
              )}
              <div></div>
              {userData && <AvatarDropdown />}
            </div>
            <div className="flex items-center space-x-3 xl:hidden">
              {userData && <NotifyDropdown />}
              <LocalesDropDown />
              {userData && <AvatarDropdown />}
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogged;
