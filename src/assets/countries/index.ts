import i18next from "i18next";
import ar from "./countries_ar.json";
import en from "./countries_en.json";

export default i18next.language == "ar" ? ar : en;
