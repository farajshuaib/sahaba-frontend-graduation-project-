import { useCrud } from "hooks/useCrud";
import { t } from "i18next";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonPrimary, { ButtonPrimaryProps } from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface FollowButtonProps extends ButtonPrimaryProps {
  isFollowing: boolean | undefined;
  user_id: number;
}

const FollowButton: FC<FollowButtonProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing,
  user_id
}) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const { create } = useCrud(`/users/toggle-follow/${user_id}`);
  const [following, setFollowing] = React.useState(isFollowing);




  return !following ? (
    <ButtonPrimary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => {
        if(typeof(isFollowing) == 'undefined'){
          navigate('/connect-wallet')
          return
        }
        create();
        setFollowing(true);
      }}
    >
      {t("Follow")}
    </ButtonPrimary>
  ) : (
    <ButtonSecondary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => {
        if(typeof(isFollowing) == 'undefined'){
          navigate('/connect-wallet')
          return
        }
        create();
        setFollowing(false);
      }}
    >
      <span className="text-sm ">{t("Following")}</span>
    </ButtonSecondary>
  );
};

export default FollowButton;
