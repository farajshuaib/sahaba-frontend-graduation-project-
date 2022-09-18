import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "pages/PageHome/PageHome";
import Page404 from "pages/Page404";
import AuthorPage from "pages/AuthorPage";
import AccountPage from "pages/AccountPage";
import PageContact from "pages/PageContact";
import PageAbout from "pages/PageAbout/PageAbout";
import PageSignUp from "pages/PageSignUp";
import PageLogin from "pages/PageLogin";
import PageSubcription from "pages/PageSubcription";
import BlogPage from "pages/BlogPage/BlogPage";
import BlogSingle from "pages/BlogPage/BlogSingle";
import NftDetailPage from "pages/NftDetailPage/NftDetailPage";
import PageCollection from "pages/PageCollection";
import PageSearch from "pages/PageSearch";
import PageUploadItem from "pages/PageUploadItem";
import PageConnectWallet from "pages/PageConnectWallet";
import HeaderLogged from "components/Header/HeaderLogged";
import { useWeb3React } from "@web3-react/core";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/nft-detailt", component: NftDetailPage },
  { path: "/collection", component: PageCollection },
  { path: "/search", component: PageSearch },
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/create-nft", component: PageUploadItem },
  { path: "/connect-wallet", component: PageConnectWallet },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
];

const Routes = () => {
  const { active } = useWeb3React();

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
