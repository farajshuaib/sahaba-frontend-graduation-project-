import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
}

const ModalDelete: FC<ModalDeleteProps> = ({ show, onCloseModalDelete }) => {
  const { t } = useTranslation();
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Delete_NFT")}
        </h3>
        <span className="text-sm">{t("Delete_NFT_desc")}</span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            {t("Delete")}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            {t("Cancel")}
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDelete;
