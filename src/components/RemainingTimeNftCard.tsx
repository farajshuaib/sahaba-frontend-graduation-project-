import useCountDownTime from "hooks/useCountDownTime";
import React, { FC } from "react";

interface Props {
  className?: string;
  contentClassName?: string;
  sale_end_at: Date
}

const RemainingTimeNftCard: FC<Props> = ({
  className = "absolute top-[-1px] right-[-1px] flex items-center",
  contentClassName = "right-5 top-1/2 -translate-y-1/2",
  sale_end_at
}) => {
  const timeLeft = useCountDownTime(sale_end_at);
  return (
    <div className={className}>
      <svg
        className="text-white dark:text-neutral-900 w-44 md:w-[195px]"
        viewBox="0 0 196 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M196 55V0H0.5V1H4.05286C12.4067 1 20.1595 5.34387 24.5214 12.4685L43.5393 43.5315C47.9012 50.6561 55.654 55 64.0078 55H196Z"
          fill="currentColor"
        />
      </svg>

      <div className={`absolute ${contentClassName}`}>
        <span className="block text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          Remaining time
        </span>
        <span className="block font-semibold md:text-lg">{timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

export default RemainingTimeNftCard;
