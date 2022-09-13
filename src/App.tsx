import { useWeb3React } from "@web3-react/core";
import { connectToWallet } from "app/account/actions";
import { useAppDispatch } from "app/hooks";
import React, { useEffect } from "react";
import MyRouter from "routers/index";
import { injected } from "services/connectors";
import { networkParams } from "services/networks";
import { switchNetwork } from "utils/functions";

function App() {
  const { account, activate, active, error, chainId } = useWeb3React();
  const dispatch = useAppDispatch();


  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !active && !error) {
        activate(injected);
      }
    });
  }, [activate, active, error]);

  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !chainId) {
        switchNetwork();
      }
    });
  }, [chainId]);

  useEffect(() => {
    if (account) dispatch(connectToWallet(account));
  }, [account]);

  return (
    <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
