import { useWeb3React } from "@web3-react/core";
import { connectToWallet, logout } from "app/account/actions";
import { getCategories, getEthPriceInUSD } from "app/general/actions";
import { useAppDispatch, useAppSelector } from "app/hooks";
import HeaderLogged from "components/Header/HeaderLogged";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { injected } from "services/connectors";
import Footer from "shared/Footer/Footer";
import { switchNetwork } from "utils/functions";

function App() {
  const { account, activate, active, error, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData: UserData = useAppSelector((state) => state.account.userData);

  const handleAccountState = async () => {
    if (account && userData?.wallet_address != account) {
      await dispatch(logout());
    }
    if (!account) return;
    await dispatch(connectToWallet(account));
    if (userData && (!userData?.username || !userData?.email)) {
      navigate("/account");
      toast.warning(t("please_complete_your_profile_data"));
    }
  };

  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !active && !error) {
        activate(injected);
      }
    });
  }, []);

  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !chainId) {
        switchNetwork();
      }
    });
  }, [chainId]);

  useEffect(() => {
    handleAccountState();
  }, [account, chainId, active]);

  useEffect(() => {
    dispatch(getEthPriceInUSD());
  }, []);

  return (
    <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <HeaderLogged />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
