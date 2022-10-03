import { Popover, Transition } from "@headlessui/react";
import { locales } from "constant";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const LocalesDropDown: React.FC = () => {
  const { i18n } = useTranslation();

  const setLang = (lang: string) => {
    i18n.changeLanguage(lang);
    document.body.dir = i18n.language == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    localStorage.setItem("locale", i18n.language);
  };

  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group  p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none relative`}
            >
              <i className="text-2xl bx bx-world"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-4 p-5 bg-white dark:bg-neutral-800">
                    <h3 className="text-xl font-semibold">languages</h3>
                    {locales.map((item: SupportedLocales, index: number) => (
                      <button
                        key={index}
                        onClick={() => setLang(item.key)}
                        className={`${item.key == i18n.language && "bg-gray-100 dark:bg-gray-700"} relative flex px-4 py-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                      >
                        {item.value}
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default LocalesDropDown;
