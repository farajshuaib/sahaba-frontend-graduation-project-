import { t } from "i18next";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <>
      {!isVerified ? (
        <ButtonPrimary
          className={className}
          sizeClass={sizeClass}
          fontSize={fontSize}
          href="/kyc-form"
        >
          {t("verify_account")}
        </ButtonPrimary>
      ) : (
        <ButtonSecondary
          className={className}
          sizeClass={sizeClass}
          fontSize={fontSize}
        >
          <span className="text-sm ">{t("verified")}</span>
        </ButtonSecondary>
      )}
    </>
  );
};

export default VerifyAccount;
