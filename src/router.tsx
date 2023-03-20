import React, { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageHome from "pages/PageHome/PageHome";
import Page404 from "pages/Page404";
import AuthorPage from "pages/AuthorPage";
import AccountPage from "pages/AccountPage";
import NftDetailPage from "pages/NftDetailPage/NftDetailPage";
import PageCollection from "pages/PageCollection";
import PageSearch from "pages/PageSearch";
import PageCreateNFT from "pages/PageCreateNFT";
import PageConnectWallet from "pages/PageConnectWallet";
import PageCreateCollection from "pages/PageCreateCollection";
import PageCollections from "pages/PageCollections";
import KYC_Form from "pages/KYC_Form";
import App from "App";
import { useAppSelector } from "app/hooks";
import PageCreatePoemNFT from "pages/PageCreatePoemNFT";

const router = () => {
  const userData = useAppSelector((state) => state.account.userData);
  return [
    {
      path: "/",
      element: <App />,
      // errorElement: <ServerError />,
      children: [
        { path: "/", element: <PageHome /> },
        { path: "/collections", element: <PageCollections /> },
        { path: "/collections/:category_id", element: <PageCollections /> },
        { path: "/collection/:id", element: <PageCollection /> },
        {
          path: "/collection/:id/edit",
          element: userData ? (
            <PageCreateCollection />
          ) : (
            <Navigate to="/connect-wallet" />
          ),
        },
        {
          path: "/create-collection",
          element: userData ? (
            <PageCreateCollection />
          ) : (
            <Navigate to="/connect-wallet" />
          ),
        },
        { path: "/search", element: <PageSearch /> },
        { path: "/nfts", element: <PageSearch /> },
        { path: "/nft-details/:id", element: <NftDetailPage /> },
        {
          path: "/create-nft",
          element: userData ? (
            <PageCreateNFT />
          ) : (
            <Navigate to="/connect-wallet" />
          ),
        },
        {
          path: "/create-poem",
          element: userData ?  <PageCreatePoemNFT /> : <PageConnectWallet />,
        },
        { path: "/author/:id", element: <AuthorPage /> },
        {
          path: "/connect-wallet",
          element: userData ? <Navigate to="/" /> : <PageConnectWallet />,
        },
        {
          path: "/account",
          element: userData ? (
            <AccountPage />
          ) : (
            <Navigate to="/connect-wallet" />
          ),
        },
        {
          path: "/kyc-form",
          element: userData ? <KYC_Form /> : <Navigate to="/connect-wallet" />,
        },
        { path: "*", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Page404 /> },
  ];
};

export default router;
