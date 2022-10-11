import useCountDownTime from "hooks/useCountDownTime";
import React from "react";
import { useTranslation } from "react-i18next";

interface props {
  sale_end_at: Date;
}

const TimeCountDown: React.FC<props> = ({ sale_end_at }) => {
  const { t } = useTranslation();
  const timeLeft = useCountDownTime(sale_end_at);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 space-x-2 text-neutral-500 dark:text-neutral-400 ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 2H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-1 leading-none">{t("Sell_ending_in")}:</span>
      </div>
      <div className="flex gap-5 md:gap-8 ">
        {[
          { val: timeLeft.days, label: t("Days") },
          { val: timeLeft.hours, label: t("Hours") },
          { val: timeLeft.minutes, label: t("Minutes") },
          { val: timeLeft.seconds, label: t("Seconds") },
        ].map((item, index) => (
          <div key={index} className="flex flex-col text-center align-middle">
            <span className="text-2xl font-semibold text-center sm:text-2xl">
              {item.val}
            </span>
            <span className="text-center sm:text-lg text-neutral-500 dark:text-neutral-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeCountDown;
