import { useWeb3React } from "@web3-react/core";
import { getCategories, getEthPriceInUSD } from "app/general/actions";
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
  const userData = useAppSelector((state) => state.account.userData);

  useEffect(() => {
    dispatch(getEthPriceInUSD());
    dispatch(getCategories());
    if (userData && (!userData?.username || !userData?.email)) {
      navigate("/account");
      toast.warning(t("please_complete_your_profile_data"));
    }
  }, []);

  return (
    <>
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
