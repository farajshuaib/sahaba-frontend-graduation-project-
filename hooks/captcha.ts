import { useEffect, useState } from "react";
import { CAPATCHA_SITE_KEY, CAPATCHA_SECRET_KEY } from "../constant";

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState(false);

  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      CAPATCHA_SECRET_KEY,
      `https://www.google.com/recaptcha/api.js?render=${CAPATCHA_SITE_KEY}`,
      function () {
        setCaptcha(true);
      }
    );
  }, []);

  return captcha;
};
