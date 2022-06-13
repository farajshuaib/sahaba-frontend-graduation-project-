import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

interface props {
  title?: string;
  description?: string;
  properties: any;
}

const AppHead: React.FC<props> = ({ title, description, properties }) => {
  return (
    <Helmet title={title || "SahabaNFT Marketplace"}>
      <title>{title || "SahabaNFT Marketplace"}</title>
      <meta name="title" content={title || "SahabaNFT Marketplace"}></meta>
      <meta
        name="description"
        content={description || "SahabaNFT Marketplace"}
      />
      <link rel="canonical" href={``} />

      {Object.entries(properties).map(([key, val], index) => (
        <meta key={index} property={key} content={val as string} />
      ))}
    </Helmet>
  );
};
export default AppHead;
