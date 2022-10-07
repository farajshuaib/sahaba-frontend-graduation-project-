import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "pages/PageHome/PageHome";
import Page404 from "pages/Page404";
import AuthorPage from "pages/AuthorPage";
import AccountPage from "pages/AccountPage";
import NftDetailPage from "pages/NftDetailPage/NftDetailPage";
import PageCollection from "pages/PageCollection";
import PageSearch from "pages/PageSearch";
import PageUploadItem from "pages/PageUploadItem";
import PageConnectWallet from "pages/PageConnectWallet";
import HeaderLogged from "components/Header/HeaderLogged";
import PageCreateCollection from "pages/PageCreateCollection";
import PageCollections from "pages/PageCollections";
import KYC_Form from "pages/KYC_Form";


export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/collections", component: PageCollections },
  { path: "/collections/:category_id", component: PageCollections },
  { path: "/collection/:id", component: PageCollection },
  { path: "/create-collection", component: PageCreateCollection },
  { path: "/search", component: PageSearch },
  { path: "/nft-details/:id", component: NftDetailPage },
  { path: "/create-nft", component: PageUploadItem },
  { path: "/author/:id", component: AuthorPage },
  { path: "/connect-wallet", component: PageConnectWallet },
  { path: "/account", component: AccountPage },
  { path: "/kyc-form", component: KYC_Form },
];

const Routes = () => {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <HeaderLogged />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
