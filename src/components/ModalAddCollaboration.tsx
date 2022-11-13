import { useAppSelector } from "app/hooks";
import { useApi } from "hooks/useApi";
import useContract from "hooks/useContract";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";

export interface ModalAddCollaborationProps {
  show: boolean;
  onCloseModalCollaboration: () => void;
  collection_id: number;
}

const ModalAddCollaboration: FC<ModalAddCollaborationProps> = ({
  show,
  onCloseModalCollaboration,
  collection_id,
}) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const api = useApi();
  const userData = useAppSelector((state) => state.account.userData);

  const { contract } = useContract();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const submit = async () => {
    if (userData?.status == "suspended") {
      toast.error(t("account_suspended"));
      return;
    }
    setLoading(true);
    try {
      await contract.addCollaborators(collection_id, address);
      await api.post(`collections-collaborators`, {
        collection_id,
        wallet_address: address,
      });
      setLoading(false);
      toast.success(t("Author_added_as_collaboration_successfully"));
      onCloseModalCollaboration();
    } catch (e: any) {
      toast.error(e.response.data.message || t("system_error"));
      setLoading(false);
    }
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Add_Collaboration")}
        </h3>
        <span className="text-sm">{t("Add_Collaboration_desc")}</span>
        <div className="mt-8 ">
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            ref={textareaRef}
            id="wallet_address"
            name="wallet_address"
            placeholder={t("Paste_author_wallet_address_address")}
            type={"text"}
          />
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            disabled={userData?.status == "suspended" || loading}
            onClick={submit}
            loading={loading}
            type="button"
          >
            {t("submit")}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalCollaboration}>
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
      onCloseModal={onCloseModalCollaboration}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalAddCollaboration;
