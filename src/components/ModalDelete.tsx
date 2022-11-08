import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "constant";
import { Contract } from "ethers";
import { useApi } from "hooks/useApi";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
  nft?: Nft;
}

const ModalDelete: FC<ModalDeleteProps> = ({
  show,
  onCloseModalDelete,
  nft,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { library, account } = useWeb3React();
  const api = useApi();
  const navigate = useNavigate();

  const handleClickSubmitForm = async () => {
    setLoading(true);
    try {
      const tx = await burnNft();
      await api.delete(`/nfts/burn/${nft?.id}`);
      toast.success(t("NFT_deleted_successfully"));
      onCloseModalDelete();
      setLoading(false);
      navigate(-1);
    } catch (errors: any) {
      setLoading(false);
      toast.error(errors?.response?.data?.message || t("NFT_deleted_failed"));
    }
  };
  const burnNft = async () => {
    return new Promise(async (resolve, reject) => {
      const contract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        library?.getSigner()
      );

      try {
        const tx = await contract.burn(nft?.id);
        resolve(tx);
      } catch (errors: any) {
        console.log("errors", errors);

        reject(errors);
      }
    });
  };

  const renderContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {t("Delete_NFT")}
        </h3>
        <span className="text-sm">{t("Delete_NFT_desc")}</span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            loading={loading}
            onClick={handleClickSubmitForm}
            type="button"
          >
            {t("Delete")}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
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
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDelete;
