import { useWeb3React } from "@web3-react/core";
import { connectToWallet } from "app/account/actions";
import { useAppDispatch } from "app/hooks";
import React, { useEffect } from "react";
import MyRouter from "routers/index";
function App() {
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("account",account)
    if (account) dispatch(connectToWallet(account));
  }, [account]);

  return (
    <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
