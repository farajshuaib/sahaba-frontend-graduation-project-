import React from "react";
import { useTranslation } from "react-i18next";

const ServerError = () => {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col items-center justify-center h-screen">
      <div className="p-8 m-auto text-center">
        <iframe
          className="object-cover w-56 h-64 mx-auto"
          src="https://embed.lottiefiles.com/animation/92811"
        ></iframe>

        <h1 className="mt-5 text-4xl text-center">
          <span className="text-6xl">500</span> <br />
          {t("Internal_server_error")}
        </h1>
        <p className="mt-3">
          {t("We_are_currently_trying_to_fix_the_problem")}
        </p>
      </div>
      <div className="absolute inset-0 z-10"></div>
    </section>
  );
};

export default ServerError;
