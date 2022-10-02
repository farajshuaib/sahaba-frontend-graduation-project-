import { useApi } from "hooks/useApi";
import React, { FC, useEffect, useRef, useState } from "react";
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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const api = useApi();

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
    setLoading(true);
    try {
      await api.post(`collections/add-collaboration/${collection_id}`, {
        wallet_address: address,
      });
      setLoading(false);
      toast.success("author added as collaboration successfully");
      onCloseModalCollaboration()
    } catch (e: any) {
      toast.error(
        e.response.data.message || "something went wrong please try again later"
      );
      setLoading(false);
    }
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Add Collaboration
        </h3>
        <span className="text-sm">
          You can add collaborations to collection by users address
        </span>
        <div className="mt-8 ">
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            ref={textareaRef}
            id="wallet_address"
            name="wallet_address"
            placeholder="Paste address"
            type={"text"}
          />
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={submit} loading={loading} type="button">
            Submit
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalCollaboration}>
            Cancel
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
