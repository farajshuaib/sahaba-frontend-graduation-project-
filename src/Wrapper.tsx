import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ar, en, fr } from "./locales";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "app/store";
import { Web3Provider } from "@ethersproject/providers";
import { Buffer } from "buffer";
import { useRegisterSW } from "virtual:pwa-register/react";

globalThis.Buffer = Buffer;
//
import "./styles/index.scss";
import "./styles/index.css";
import "./assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
    fr: {
      translation: fr,
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

const intervalMS = 60 * 60 * 1000;

interface Props {
  children: React.ReactNode;
}
const Wrapper: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();

  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  useEffect(() => {
    document.body.dir = i18n.language == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
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
