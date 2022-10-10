import React from "react";
import { useTranslation } from "react-i18next";

const ServerError = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 m-auto text-center">
        <img
          className="object-cover w-56 mx-auto h-44"
          alt="error"
          loading="lazy"
          src="https://i.imgur.com/qIufhof.png"
        />

        <h1 className="mt-5 text-4xl text-center">
          <span className="text-6xl">500</span> <br />
          {t("Internal_server_error")}
        </h1>
        <p className="mt-3">
          {t("We_are_currently_trying_to_fix_the_problem")}
        </p>
      </div>
    </section>
  );
};

export default ServerError;
