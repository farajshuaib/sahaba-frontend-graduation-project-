import { useCrud } from "hooks/useCrud";
import React, { useEffect } from "react";

const PageCollections = () => {
  const { fetch, loading } = useCrud("/collections");

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <></>;
  }

  return <div></div>;
};

export default PageCollections;
