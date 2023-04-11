import { useWeb3React } from "@web3-react/core";
import { connectToWallet, logout } from "app/account/actions";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import { connectors } from "services/connectors";
import { switchNetwork } from "utils/functions";
import LoadingScreen from "./LoadingScreen";

interface Props {
  children: React.ReactNode;
}

const AuthStateWrapper: React.FC<Props> = ({ children }) => {
  const { account, activate, active, error, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector(
    (state) => state.account.userData
  ) as UserData;

  const handleAccountState = async () => {
    setLoading(true);
    // handel account changes, will logout if user changes account to handle new user signing in
    if (account && userData && userData?.wallet_address != account) {
      await dispatch(logout());
    }
    if (!account) {
      setLoading(false);
      return;
    }
    dispatch(connectToWallet(account)).finally(() => setLoading(false));
  };

  useEffect(() => {
    connectors.injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !active && !error) {
        activate(connectors.injected);
      }
    });
  }, []);

  useEffect(() => {
    connectors.injected.isAuthorized().then(async (isAuthorized) => {
      if (isAuthorized && !chainId) {
        switchNetwork();
      }
    });
  }, [chainId]);

  useEffect(() => {
    handleAccountState();
  }, [account, chainId, active]);
  

  if (loading) {
    return (
      <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <div className="flex items-center justify-center h-screen">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthStateWrapper;
