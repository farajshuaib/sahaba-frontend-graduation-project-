import { useAppSelector } from "app/hooks";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import NftMoreDropdown from "components/NftMoreDropdown";
import React from "react";
import { useTranslation } from "react-i18next";

interface LikeSaveBtnProps {
  nft: Nft;
  getNft: () => void;
}

const LikeSaveBtns: React.FC<LikeSaveBtnProps> = ({ nft, getNft }) => {
  const {t} = useTranslation()
  const userData = useAppSelector((state) => state.account.userData);

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <ButtonDropDownShare
          panelMenusClass="!w-52"
          handleShareOnFacebook={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?url=${window.location.href}`,
              "_blank"
            );
          }}
          handleShareOnTwitter={() => {
            window.open(
              `http://www.twitter.com/share?url=${window.location.href}`,
              "_blank"
            );
          }}
        />
        <NftMoreDropdown
          nft={nft}
          getNft={getNft}
          actions={
            userData?.id != nft?.owner?.id
              ? [
                  {
                    id: "report",
                    name: t("Report_abuse"),
                    icon: "las la-flag",
                  },
                ]
              : [
                  {
                    id: "edit",
                    name: t("Change_price"),
                    icon: "las la-dollar-sign",
                  },
                  {
                    id: "delete",
                    name: t("Delete_item"),
                    icon: "las la-trash-alt",
                  },
                ]
          }
        />
      </div>
    </div>
  );
};

export default LikeSaveBtns;
