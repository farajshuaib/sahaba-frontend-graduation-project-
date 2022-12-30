import { useAppSelector } from "app/hooks";
import { utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import useContract from "hooks/useContract";
import { useCrud } from "hooks/useCrud";
import { useRecaptcha } from "hooks/useRecaptcha";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { checkCapatcha, usdPrice } from "utils/functions";
import FormItem from "./FormItem";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
  nft?: Nft;
  getNft?: () => void;
}

const ModalEdit: FC<ModalEditProps> = ({
  show,
  onCloseModalEdit,
  nft,
  getNft,
}) => {
  const { t } = useTranslation();
  const textareaRef = useRef(null);
  const [price, setPrice] = useState<number>(nft?.price || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useCrud(`/nfts/update-price`);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const { contract } = useContract();
  const [ownerReceived, setOwnerReceived] = useState<number>(0);

  const userData = useAppSelector(
    (state) => state.account.userData
  ) as UserData;

  const recaptcha = useRecaptcha();

  async function getServiceFeesPrice() {
    const res = await contract.getServiceFeesPrice();
    setServiceFee(+utils.formatEther(res).toString());
  }

  const submit = async () => {
    if (!nft) return;
    if (userData && userData?.status === "suspended") {
      toast.error(t("Your_account_is_suspended"));
      return;
    }

    if (!recaptcha) {
      toast.error("Beep-bop, you're a robot!");
      return;
    }

    const token = await checkCapatcha();

    if (!token) {
      toast.error(t("please_verify_you_are_not_a_robot"));
      return;
    }

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
      getNft && getNft();
      setLoading(false);
      onCloseModalEdit();
    } catch (error) {
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

  useEffect(() => {
    getServiceFeesPrice();
    calcOwnerReceived(nft?.price || 0);
  }, []);

  const calcOwnerReceived = (price: number) => {
    const fees = price * serviceFee;
    setOwnerReceived(price - fees);
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Change_price")}
        </h3>
        <span className="text-sm">{t("Change_price_desc")}</span>
        <div>
          <FormItem
            label={t("price")}
            desc={`${+serviceFee * 100}% ${t("service_fees")}`}
            className="mt-8"
          >
            <div className="relative flex">
              <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                ETH
              </span>
              <Input
                id="price"
                type="number"
                name="price"
                value={price}
                onChange={(e) => {
                  if (!e.currentTarget.value) return;
                  setPrice(+e.currentTarget.value);
                  calcOwnerReceived(+e.currentTarget.value);
                }}
                min={0.01}
                max={5.0}
                className="!rounded-l-none w-full"
                placeholder="0.01"
              />
              <span className="absolute right-0 p-3 text-sm align-middle border border-l-0 rounded-r-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                {usdPrice(+price)}
              </span>
            </div>
          </FormItem>
          <div className="relative flex items-baseline gap-1 text-sm font-semibold text-green-500">
            <span className=" text-neutral-500 dark:text-neutral-400">
              {t("you_will_receive")}
            </span>
            <span className="">{ownerReceived} ETH</span>
            <span className="">≈ {usdPrice(ownerReceived)}</span>
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
