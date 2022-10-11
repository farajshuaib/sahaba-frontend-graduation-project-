import React from "react";
import NavigationItem from "./NavigationItem";
import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import { useTranslation } from "react-i18next";


function Navigation() {
  const { t } = useTranslation();

  const NAVIGATION_DEMO_2: NavItemType[] = [
    {
      id: ncNanoId(),
      href: "/",
      name: t("Home"),
    },
    {
      id: ncNanoId(),
      href: "/search",
      name: t("explore"),
    },
    {
      id: ncNanoId(),
      href: "/collections",
      name: t("Collections"),
    },
  ];
  
  return (
    <ul className="relative hidden nc-Navigation lg:flex lg:flex-wrap lg:items-center lg:space-x-1">
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
