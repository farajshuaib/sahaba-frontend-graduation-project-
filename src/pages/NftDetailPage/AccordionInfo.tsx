import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { CONTRACT_ADDRESS } from "constant";
import { useTranslation } from "react-i18next";

export default function AccordionInfo({ nft }: { nft: Nft }) {
  const { t } = useTranslation();
  return (
    <div className="w-full rounded-2xl">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>{t("Description")}</span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
              as="p"
            >
              {nft.description}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure defaultOpen as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>{t("Details")}</span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col px-4 pt-4 pb-2 overflow-hidden text-xs text-neutral-500 dark:text-neutral-400">
              <br />
              <span>{t("Contract Address")}</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">
                {CONTRACT_ADDRESS}
              </span>

              <br />
              <span>Token ID</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100">
                {nft.token_id}
              </span>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
