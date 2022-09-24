import LoadingScreen from "components/LoadingScreen";
import { useCrud } from "hooks/useCrud";
import React, { useEffect } from "react";

const PageCollections = () => {
  const { fetch, loading } = useCrud("/collections");

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <div></div>;
};

export default PageCollections;
