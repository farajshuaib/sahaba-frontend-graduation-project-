import { useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

interface Props {
  children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.account.userData);

  useEffect(() => {
    if (!userData) {
      navigate("/connect-wallet");
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default RequireAuth;
