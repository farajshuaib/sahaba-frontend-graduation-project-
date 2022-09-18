import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/nft-detailt/:id"?: {};
  "/create-collection"?:{};
  "/collection/:id"?: {};
  "/search"?: {};
  "/author/:id"?: {};
  "/create-nft"?: {};
  "/connect-wallet"?: {};
  "/account"?: {};
  "/blog"?: {};
  "/blog-single"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
