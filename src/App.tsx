import { useWeb3React } from "@web3-react/core";
import { connectToWallet, logout } from "app/account/actions";
import { getCategories } from "app/general/actions";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect } from "react";
import MyRouter from "routers/index";
import { injected } from "services/connectors";
import { networkParams } from "services/networks";
import { switchNetwork } from "utils/functions";

function App() {
  const { account, activate, active, error, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const userData: UserData = useAppSelector((state) => state.account.userData);

  const handleAccountState = async () => {
    if (account && (userData?.wallet_address != account)) {
      await dispatch(logout());
    }
    if (!account) return;
    await dispatch(connectToWallet(account));
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
  }, [account, chainId]);

  return (
    <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
