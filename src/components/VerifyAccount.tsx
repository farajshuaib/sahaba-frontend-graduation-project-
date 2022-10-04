import React, { FC } from "react";
import ButtonPrimary, { ButtonPrimaryProps } from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface VerifyAccountProps extends ButtonPrimaryProps {
  isVerified: boolean;
}

const VerifyAccount: FC<VerifyAccountProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isVerified,
}) => {
  return (
    <>
      {!isVerified ? (
        <ButtonPrimary
          className={className}
          sizeClass={sizeClass}
          fontSize={fontSize}
          href="/kyc-form"
        >
          verify account
        </ButtonPrimary>
      ) : (
        <ButtonSecondary
          className={className}
          sizeClass={sizeClass}
          fontSize={fontSize}
        >
          <span className="text-sm ">verified</span>
        </ButtonSecondary>
      )}
    </>
  );
};

export default VerifyAccount;
