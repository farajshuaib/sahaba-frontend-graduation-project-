import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Navigation from "shared/Navigation/Navigation";
import { useAppSelector } from "app/hooks";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const userData = useAppSelector((state) => state.account.userData);
  
  return (
    <div className={`nc-MainNav2Logged relative z-10 ${"onTop "}`}>
      <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
        <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="flex-grow hidden max-w-xs sm:block">
            <form action="" method="POST" className="relative">
              <Input
                type="search"
                placeholder="Search items"
                className="w-full pr-10"
                sizeClass="h-[42px] pl-4 py-3"
              />
              <span className="absolute -translate-y-1/2 top-1/2 right-3 text-neutral-500">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input type="submit" hidden value="" />
            </form>
          </div>
        </div>
        <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
          <div className="items-center hidden space-x-2 xl:flex">
            <Navigation />
            <div className="hidden h-6 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
            <div className="flex">
              <SwitchDarkMode />
              <NotifyDropdown />
            </div>
            <div></div>
            {userData && (
              <ButtonPrimary
                href={"/create-nft"}
                sizeClass="px-4 py-2 sm:px-5"
              >
                Create
              </ButtonPrimary>
            )}
            {!userData && (
              <ButtonPrimary
                href={"/connect-wallet"}
                sizeClass="px-4 py-2 sm:px-5"
              >
                Connect Wallet
              </ButtonPrimary>
            )}
            <div></div>
            {userData && <AvatarDropdown />}
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            <NotifyDropdown />
            {userData && <AvatarDropdown />}
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2Logged;
