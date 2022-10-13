import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageHome from "pages/PageHome/PageHome";
import Page404 from "pages/Page404";
import AuthorPage from "pages/AuthorPage";
import AccountPage from "pages/AccountPage";
import NftDetailPage from "pages/NftDetailPage/NftDetailPage";
import PageCollection from "pages/PageCollection";
import PageSearch from "pages/PageSearch";
import PageUploadItem from "pages/PageUploadItem";
import PageConnectWallet from "pages/PageConnectWallet";
import PageCreateCollection from "pages/PageCreateCollection";
import PageCollections from "pages/PageCollections";
import KYC_Form from "pages/KYC_Form";
import { Page } from "type";
import App from "App";
import ServerError from "components/ServerError";
import RequireAuth from "components/RequireAuth";

export const pages: Page[] = [
  { path: "/", element: <PageHome /> },
  { path: "/collections", element: <PageCollections /> },
  { path: "/collections/:category_id", element: <PageCollections /> },
  { path: "/collection/:id", element: <PageCollection /> },
  {
    path: "/collection/:id/edit",
    element: (
      <RequireAuth>
        <PageCreateCollection />
      </RequireAuth>
    ),
  },
  {
    path: "/create-collection",
    element: (
      <RequireAuth>
        <PageCreateCollection />{" "}
      </RequireAuth>
    ),
  },
  { path: "/search", element: <PageSearch /> },
  { path: "/nft-details/:id", element: <NftDetailPage /> },
  {
    path: "/create-nft",
    element: (
      <RequireAuth>
        <PageUploadItem />
      </RequireAuth>
    ),
  },
  { path: "/author/:id", element: <AuthorPage /> },
  { path: "/connect-wallet", element: <PageConnectWallet /> },
  {
    path: "/account",
    element: (
      <RequireAuth>
        <AccountPage />
      </RequireAuth>
    ),
  },
  {
    path: "/kyc-form",
    element: (
      <RequireAuth>
        <KYC_Form />
      </RequireAuth>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ServerError />,
    children: pages,
  },
]);

export default router;
