import React from "react";
import ReactDOM from "react-dom/client";
import Wrapper from "Wrapper";
import { BrowserRouter } from "react-router-dom";

//

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Wrapper></Wrapper>
  </BrowserRouter>
);
