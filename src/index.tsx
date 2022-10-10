import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Wrapper from "Wrapper";
import { RouterProvider } from "react-router-dom";
import router from "router";

//

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
