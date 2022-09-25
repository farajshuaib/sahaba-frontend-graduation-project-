import { useCrud } from "hooks/useCrud";
import React, { FC } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
  const history = useHistory()
  const { create } = useCrud(`/users/toggle-follow/${user_id}`);
  const [following, setFollowing] = React.useState(isFollowing);




  return !following ? (
    <ButtonPrimary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => {
        if(typeof(isFollowing) == 'undefined'){
          history.push('/connect-wallet')
          return
        }
        create();
        setFollowing(true);
      }}
    >
      Follow
    </ButtonPrimary>
  ) : (
    <ButtonSecondary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => {
        if(typeof(isFollowing) == 'undefined'){
          history.push('/connect-wallet')
          return
        }
        create();
        setFollowing(false);
      }}
    >
      <span className="text-sm ">Following</span>
    </ButtonSecondary>
  );
};

export default FollowButton;
