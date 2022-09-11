import React, { FC } from "react";
import MainNav1 from "./MainNav1";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div id="nc-chifis-header" className="z-40 w-full nc-Header">
      {/* NAV */}
      <MainNav1 isTop />
    </div>
  );
};

export default Header;
