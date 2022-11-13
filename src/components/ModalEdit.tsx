import { parseEther } from "ethers/lib/utils";
import useContract from "hooks/useContract";
import { useCrud } from "hooks/useCrud";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
  nft?: Nft;
}

const ModalEdit: FC<ModalEditProps> = ({ show, onCloseModalEdit, nft }) => {
  const { t } = useTranslation();
  const textareaRef = useRef(null);
  const [price, setPrice] = useState<number>(nft?.price || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useCrud(`/nfts/update-price`);

  const { contract } = useContract();

  const submit = async () => {
    if (!nft) return;
    try {
      setLoading(true);
      const transaction = await contract.changeTokenPrice(
        nft.id,
        parseEther(price.toString())
      );
      await transaction.wait();
      await update({
        id: nft.id,
        payload: { price, tx_hash: transaction.hash },
      });
      toast.success(t("NFT_price_updated_successfully"));
      setLoading(false);
      onCloseModalEdit();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Change_price")}
        </h3>
        <span className="text-sm">{t("Change_price_desc")}</span>
        <div className="relative mt-8 rounded-md shadow-sm">
          <Input
            ref={textareaRef}
            value={price}
            name="price"
            id="price"
            onChange={(e) => {
              const val = e.currentTarget?.value;
              setPrice(+val);
            }}
            type={"number"}
          />

          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              {t("Currency")}
            </label>
            <select
              id="currency"
              name="currency"
              disabled={true}
              className="h-full py-0 pl-2 bg-transparent border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 text-neutral-500 dark:text-neutral-300 sm:text-sm"
            >
              <option>ETH</option>
              <option>BC</option>
              <option>BTH</option>
            </select>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            loading={loading}
            disabled={loading}
            type="button"
            onClick={submit}
          >
            {t("submit")}
          </ButtonPrimary>
          <ButtonSecondary
            disabled={loading}
            type="button"
            onClick={onCloseModalEdit}
          >
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
      onCloseModal={onCloseModalEdit}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalEdit;
