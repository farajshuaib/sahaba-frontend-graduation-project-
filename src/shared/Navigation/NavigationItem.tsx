import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { FC, Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// <--- NavItemType --->
export interface MegamenuItem {
  id: string;
  image: string;
  title: string;
  items: NavItemType[];
}
export interface NavItemType {
  id: string;
  name: string;
  href: keyof LocationStates | "#" | "/#";
  targetBlank?: boolean;
  children?: NavItemType[];
  megaMenu?: MegamenuItem[];
  type?: "dropdown" | "megaMenu" | "none";
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

type NavigationItemWithRouterProps = NavigationItemProps;

const NavigationItem: FC<NavigationItemWithRouterProps> = ({ menuItem }) => {
  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return (
      <NavLink
        target={item.targetBlank ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={({ isActive }) =>
          `inline-flex items-center px-4 py-2 text-sm font-normal rounded-full xl:text-base text-neutral-700 dark:text-neutral-300 xl:px-5 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 ${
            isActive &&
            "!font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100"
          }`
        }
        to={{
          pathname: item.href || undefined,
        }}
        end
      >
        {item.name}
        {item.type && (
          <ChevronDownIcon
            className="w-4 h-4 ml-1 -mr-1 text-neutral-400"
            aria-hidden="true"
          />
        )}
      </NavLink>
    );
  };

  return <li className="menu-item">{renderMainItem(menuItem)}</li>;
};

export default NavigationItem;
