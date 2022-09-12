import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;
//
import "./styles/index.scss";
import "./index.css";
import "./assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

//

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
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
