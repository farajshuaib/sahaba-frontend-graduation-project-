import React, { FC, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import { useApi } from "hooks/useApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface ProblemPlan {
  name: string;
  id: string;
  label: string;
}

export interface ModalReportItemProps {
  show: boolean;
  onCloseModalReportItem: () => void;
  nft?: Nft;
  user?: UserData;
  collection?: Collection;
}

const ModalReportItem: FC<ModalReportItemProps> = ({
  show,
  onCloseModalReportItem,
  nft,
  user,
  collection,
}) => {
  const { t } = useTranslation();

  const problemPlans = [
    { name: "violence", id: "Violence", label: t("Violence") },
    { name: "trouble", id: "Trouble", label: t("Trouble") },
    { name: "spam", id: "Spam", label: t("Spam") },
    { name: "other", id: "Other", label: t("Other") },
  ];

  const textareaRef = useRef(null);
  const api = useApi();
  const [problemSelected, setProblemSelected] = useState({
    name: "violence",
    id: "Violence",
    label: t("Violence"),
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const handleClickSubmitForm = async () => {
    setLoading(true);
    let api_route = user
      ? `/users/report/${user.id}`
      : nft
      ? `/nfts/report/${nft.id}`
      : collection
      ? `/collections/report/${collection.id}`
      : "";
    try {
      await api.post(api_route, {
        message,
        type: problemSelected.name,
      });
      toast.success(t("Thank_you_for_your_report") as string);
      setLoading(false);
      onCloseModalReportItem();
    } catch (error: any) {
      toast.error(error?.response.data.message || t("system_error"));
      setLoading(false);
    }
  };

  const renderCheckIcon = () => {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderContent = () => {
    return (
      <div>
        {/* RADIO PROBLEM PLANS */}
        <RadioGroup value={problemSelected} onChange={setProblemSelected}>
          <RadioGroup.Label className="sr-only">
            {t("Problem_Plans")}
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {problemPlans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ checked }) => {
                  return `${
                    checked
                      ? "bg-primary-6000 text-white dark:bg-primary-700"
                      : "bg-white dark:bg-black/20 border-t dark:border-0 border-neutral-50 "
                  } relative shadow-lg rounded-lg px-3 py-3 cursor-pointer flex sm:px-5 sm:py-4 focus:outline-none `;
                }}
              >
                {({ checked }) => (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium line-clamp-1 ${
                            checked
                              ? "text-white"
                              : "text-neutral-900 dark:text-white"
                          }`}
                        >
                          {plan.label}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-white">
                        {renderCheckIcon()}
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {/* TEXAREA MESSAGER */}
        <div className="w-full my-5">
          <h4 className="text-lg font-semibold text-justify text-neutral-700 dark:text-neutral-200">
            {t("Message")}
          </h4>
          <p className="w-full text-sm text-justify text-neutral-6000 dark:text-neutral-400">
            {t("Report_Message_desc")}
          </p>
          <Textarea
            placeholder="..."
            className="mt-3"
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              if (!e.currentTarget.value) return;
              setMessage(e.currentTarget.value);
            }}
            required={true}
            rows={4}
            id="report-message"
          />
        </div>
        <div className="flex gap-3 mt-4 space-x-3">
          <ButtonPrimary
            loading={loading}
            onClick={handleClickSubmitForm}
            type="button"
          >
            {t("submit")}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalReportItem}>
            {t("Cancel")}
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalReportItem}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Report Abuse"
    />
  );
};

export default ModalReportItem;
