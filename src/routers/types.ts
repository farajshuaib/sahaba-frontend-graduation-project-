import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/nft-details/:id"?: {};
  "/collections"?: {};
  "/collections/:category_id"?:{};
  "/create-collection"?:{};
  "/collection/:id"?: {};
  "/search"?: {};
  "/author/:id"?: {};
  "/create-nft"?: {};
  "/connect-wallet"?: {};
  "/account"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/kyc-form"?: {}
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
