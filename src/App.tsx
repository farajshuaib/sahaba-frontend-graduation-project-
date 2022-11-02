import { useWeb3React } from "@web3-react/core";
import { getEthPriceInUSD } from "app/general/actions";
import { useAppDispatch, useAppSelector } from "app/hooks";
import HeaderLogged from "components/Header/HeaderLogged";
import { Alert } from "flowbite-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "shared/Footer/Footer";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData: UserData = useAppSelector((state) => state.account.userData);
  const { chainId } = useWeb3React();

  useEffect(() => {
    dispatch(getEthPriceInUSD());
    if (userData && (!userData?.username || !userData?.email)) {
      navigate("/account");
      toast.warning(t("please_complete_your_profile_data"));
    }
  }, []);

  return (
    <>
      {!window.ethereum && (
        <Alert color="warning">
          <span className="block w-screen font-medium text-center">
            <span>{t("no_provider")}</span>
            <a href="https://metamask.io/download/" target="_blank">
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

      {chainId && chainId == 5 && (
        <Alert color="info">
          <span className="block w-screen font-medium text-center">
            {t("you_are_on_goerli")}
          </span>
        </Alert>
      )}

      {/* main layouts */}
      <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <HeaderLogged />
        <div className="pt-24">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
