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
import { useWeb3React } from "@web3-react/core";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const Alerts: FC = () => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const userData = useAppSelector((state) => state.account.userData);
  return (
    <>
      {chainId && chainId == 5 && (
        <div className="flex items-center justify-center w-full py-4 mx-auto font-medium text-center text-blue-800 bg-blue-100 rounded-b-lg shadow-sm">
          {t("you_are_on_goerli")}
        </div>
      )}
      {!window?.ethereum && (
        <div className="flex items-center justify-center w-full py-4 mx-auto font-medium text-center bg-yellow-400 rounded-b-lg shadow-sm">
          <span>{t("no_provider")}</span>{" "}
          <a
            href="https://metamask.io/download/"
            className="font-bold underline"
            target="_blank"
          >
            {t("install_metamask")}
          </a>
        </div>
      )}

      {userData && userData?.status == "suspended" && (
        <div className="flex items-center justify-center w-full py-4 mx-auto font-medium text-center bg-red-600 rounded-b-lg shadow-sm">
          {t("account_suspended")}
        </div>
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

        <div className="container relative flex items-center justify-between py-5 ">
          <div className="flex items-center justify-start flex-grow ">
            <Logo />
          </div>
          <div className="flex items-center justify-start flex-shrink-0 text-neutral-700 dark:text-neutral-100">
            <div className="items-center hidden gap-2 xl:flex">
              <Navigation />
              <div className="hidden h-6 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
              <div className="flex">
                {userData && <NotifyDropdown />}
                <LocalesDropDown />
              </div>
              {userData && (
                <>
                  <ButtonPrimary
                    href={"/create-nft"}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    {t("Create")}
                  </ButtonPrimary>
                  <ButtonSecondary href="/create-poem">
                    <span>{t("create-poem")}</span>
                    <span>📜</span>
                  </ButtonSecondary>
                </>
              )}

              {!userData && (
                <ButtonPrimary
                  href={"/connect-wallet"}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  {t("Connect_wallet")}
                </ButtonPrimary>
              )}
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
