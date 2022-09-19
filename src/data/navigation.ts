import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  {
    id: ncNanoId(),
    href: "/collection/:id",
    name: "Collection page",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Search page",
  },
  {
    id: ncNanoId(),
    href: "/author/:id",
    name: "Author Profile",
  },
  {
    id: ncNanoId(),
    href: "/nft-detailt/:id",
    name: "NFT detailt",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account settings",
  },
  {
    id: ncNanoId(),
    href: "/create-nft",
    name: "Upload Item",
  },
  {
    id: ncNanoId(),
    href: "/connect-wallet",
    name: "Connect Wallet",
  },

  {
    id: ncNanoId(),
    href: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/contact",
        name: "Contact us",
      },
      
      {
        id: ncNanoId(),
        href: "/subscription",
        name: "Subscription",
      },
    ],
  },
 
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "explore",
  },
];
