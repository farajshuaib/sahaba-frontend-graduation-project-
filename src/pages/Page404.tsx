import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "assets/images/404.png";
import { useTranslation } from "react-i18next";

const Page404: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="nc-Page404">
      <Helmet>
        <title>404 || Sahaba </title>
      </Helmet>
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="max-w-2xl mx-auto space-y-2 text-center">
          <NcImage src={I404Png} />
          <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
            {t("404")}
          </span>
          <div className="pt-8">
            <ButtonPrimary href="/">{t("Return_Home_Page")}</ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Page404;
