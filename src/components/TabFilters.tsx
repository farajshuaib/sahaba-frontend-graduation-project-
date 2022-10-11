import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "shared/Radio/Radio";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

interface Props {
  setPriceRange: (val: number[]) => void;
  setSortBy: (val: string) => void;
  setIsVerifiedUser: (val: boolean) => void;
}

//
const TabFilters: React.FC<Props> = ({
  setPriceRange,
  setSortBy,
  setIsVerifiedUser,
}) => {
  const { t, i18n } = useTranslation();

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isVerifiedCreator, setIsVerifiedCreator] = useState(true);
  const [rangePrices, setRangePrices] = useState([0.01, 5]);

  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  const sortOrderRadios = [
    { name: t("Recently_listed"), id: "Recently-listed" },
    { name: t("Ending_soon"), id: "Ending-soon" },
    { name: t("Price_low_hight"), id: "Price-low-high" },
    { name: t("Price_hight_low"), id: "Price-high-low" },
    { name: t("Most_favorited"), id: "Most-favorite" },
  ];

  useEffect(() => {
    if (isVerifiedCreator) setIsVerifiedUser(isVerifiedCreator);
  }, [isVerifiedCreator]);

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //

  // OK
  const renderXClear = () => {
    return (
      <span className="flex items-center justify-center flex-shrink-0 w-4 h-4 ml-3 text-white rounded-full cursor-pointer bg-primary-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  // OK
  const renderTabsSortOrder = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center gap-2 justify-center px-4 py-2 text-sm border rounded-full focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${
                  !!sortOrderStates.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path
                  d="M11.5166 5.70834L14.0499 8.24168"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5166 14.2917V5.70834"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48327 14.2917L5.94995 11.7583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48315 5.70834V14.2917"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="">
                {sortOrderStates
                  ? sortOrderRadios.filter((i) => i.id === sortOrderStates)[0]
                      .name
                  : t("Sort_order")}
              </span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 " />
              ) : (
                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
              )}
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
              <Popover.Panel className={`absolute ${i18n.language == 'ar'  ? "right-0" : "left-0" } z-40 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-md`}>
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col gap-4 px-5 py-6 space-y-5">
                    {sortOrderRadios.map((item) => (
                      <Radio
                        id={item.id}
                        key={item.id}
                        name="radioNameSort"
                        label={item.name}
                        defaultChecked={sortOrderStates === item.id}
                        onChange={setSortOrderStates}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setSortOrderStates("");
                        setSortBy("");
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Clear")}
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        setSortBy(sortOrderStates);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Apply")}
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center gap-2 justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="">{`${rangePrices[0]} ETH - ${rangePrices[1]} ETH`}</span>
              {renderXClear()}
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
              <Popover.Panel className={`absolute ${i18n.language == 'ar'  ? "right-0" : "left-0" } z-40 w-screen max-w-sm px-4 mt-3 sm:px-0 `}>
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">{t("Price_range")}</span>
                      <Slider
                        range
                        min={0.01}
                        max={5}
                        step={0.01}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(_input: number | number[]) =>
                          setRangePrices(_input as number[])
                        }
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          {t("Min_price")}
                        </label>
                        <div className="relative mt-1 rounded-md">
                          <span className="absolute inset-y-0 flex items-center pointer-events-none right-4 text-neutral-500 sm:text-sm">
                            ETH
                          </span>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="block w-32 px-12 bg-transparent rounded-full sm:text-sm border-neutral-200 dark:border-neutral-700"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          {t("Max_price")}
                        </label>
                        <div className="relative mt-1 rounded-md">
                          <span className="absolute inset-y-0 flex items-center pointer-events-none right-4 text-neutral-500 sm:text-sm">
                            ETH
                          </span>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="block w-32 px-12 bg-transparent rounded-full sm:text-sm border-neutral-200 dark:border-neutral-700"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices([0.01, 5]);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Clear")}
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        setPriceRange(rangePrices);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Apply")}
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabVerifiedCreator = () => {
    return (
      <div
        className={`flex items-center gap-3 justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer  ${
          isVerifiedCreator
            ? "border-primary-500 bg-primary-50 text-primary-900"
            : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
        }`}
        onClick={() => setIsVerifiedCreator(!isVerifiedCreator)}
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          <path
            d="M9.99992 10C12.3011 10 14.1666 8.13452 14.1666 5.83334C14.1666 3.53215 12.3011 1.66667 9.99992 1.66667C7.69873 1.66667 5.83325 3.53215 5.83325 5.83334C5.83325 8.13452 7.69873 10 9.99992 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.84155 18.3333C2.84155 15.1083 6.04991 12.5 9.99991 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.1667 17.8334C16.6394 17.8334 17.8334 16.6394 17.8334 15.1667C17.8334 13.6939 16.6394 12.5 15.1667 12.5C13.6939 12.5 12.5 13.6939 12.5 15.1667C12.5 16.6394 13.6939 17.8334 15.1667 17.8334Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3333 18.3333L17.5 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className=" line-clamp-1">{t("Verified_creator")}</span>
        {isVerifiedCreator && renderXClear()}
      </div>
    );
  };

  // OK
  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center gap-2 justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>
            <span className="hidden sm:inline">NFTs</span> {t("filters")}
          </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block w-full h-screen py-8"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full h-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100">
                  <div className="relative flex-shrink-0 px-6 py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      NFTs {t("filters")}
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-8 divide-y md:px-10 divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          {t("Range_Prices")}
                        </h3>
                        <div className="relative mt-6 ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                                onChange={(_input: number | number[]) =>
                                  setRangePrices(_input as number[])
                                }
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  {t("Min_price")}
                                </label>
                                <div className="relative mt-1 rounded-md">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  {t("Max_price")}
                                </label>
                                <div className="relative mt-1 rounded-md">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          {t("Sort_order")}
                        </h3>
                        <div className="relative mt-6 ">
                          <div className="relative flex flex-col space-y-5">
                            {sortOrderRadios.map((item) => (
                              <Radio
                                id={item.id}
                                key={item.id}
                                name="radioNameSort"
                                label={item.name}
                                defaultChecked={sortOrderStates === item.id}
                                onChange={setSortOrderStates}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-shrink-0 p-6 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices([0.01, 10]);

                        setSortOrderStates("");
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Clear")}
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      {t("Apply")}
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden gap-5 space-x-4 lg:flex">
        {renderTabsPriceRage()}
        {renderTabsSortOrder()}
        {renderTabVerifiedCreator()}
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex space-x-4 overflow-x-auto lg:hidden">
        {renderTabMobileFilter()}
        {renderTabVerifiedCreator()}
      </div>
    </div>
  );
};

export default TabFilters;
