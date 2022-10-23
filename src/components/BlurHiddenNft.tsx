import React from "react";
import { useTranslation } from "react-i18next";

const BlurHiddenNft: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute inset-0 flex items-center justify-center object-cover backdrop-blur-md bg-white/30 rounded-3xl">
      <div className="flex flex-col gap-1">
        <h5 className="text-lg font-bold leading-relaxed">
          {t("this_nft_has_been_hidden")}
        </h5>
        <p></p>
      </div>
    </div>
  );
};

export default BlurHiddenNft;
