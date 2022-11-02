import React, { Children, useEffect, useLayoutEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ar, en } from "./locales";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import { persistor, store } from "app/store";
import { Web3Provider } from "@ethersproject/providers";
import { useRegisterSW } from "virtual:pwa-register/react";
import useDarkMode from "hooks/useDarkMode";
import AuthStateWrapper from "components/AuthStateWrapper";
import { useRoutes } from "react-router-dom";
import router from "router";
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
//
import "react-toastify/dist/ReactToastify.css";
import "./assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import "./styles/index.scss";
import "./styles/index.css";


i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng:
    localStorage.getItem("locale") || navigator.language.split("-")[0] || "ar", // if you're using a language detector, do not define the lng option
  fallbackLng: navigator.language.split("-")[0] || "ar",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const RenderRoutes = () => {
  const routes = useRoutes(router());
  return routes;
};

const Wrapper: React.FC = ({}) => {
  const { i18n } = useTranslation();
  const {} = useDarkMode();

  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    },
  });

  useEffect(() => {
    document.body.dir = i18n.language == "en" ? "ltr" : "rtl";
    document.documentElement.lang = i18n.language;
    if (i18n.language == "ar") {
      document.body.style.fontFamily = "Tajawal, sans-serif";
    } else {
      document.body.style.fontFamily = "Inter, sans-serif";
    }
  }, [i18n.language]);

  useLayoutEffect(() => {
    document.documentElement?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthStateWrapper>
            <RenderRoutes />
          </AuthStateWrapper>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            rtl={i18n.language == "ar"}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Wrapper;
