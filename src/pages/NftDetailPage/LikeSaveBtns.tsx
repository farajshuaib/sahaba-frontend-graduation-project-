import { useAppSelector } from "app/hooks";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import NftMoreDropdown from "components/NftMoreDropdown";
import React from "react";

interface LikeSaveBtnProps {
  nft: Nft;
}

const LikeSaveBtns: React.FC<LikeSaveBtnProps> = ({ nft }) => {
  const userData = useAppSelector((state) => state.account.userData);

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <ButtonDropDownShare
          panelMenusClass="!w-52"
          handleShareOnFacebook={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
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
          actions={
            userData?.id != nft?.owner?.id
              ? [
                  {
                    id: "report",
                    name: "Report abuse",
                    icon: "las la-flag",
                  },
                ]
              : [
                  {
                    id: "edit",
                    name: "Change price",
                    icon: "las la-dollar-sign",
                  },
                  {
                    id: "delete",
                    name: "Delete item",
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
