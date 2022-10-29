import axios, { AxiosInstance } from "axios";
import { getI18n } from "react-i18next";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {
      locale: getI18n().language || "en",
    },
  });

  const token = localStorage.getItem("token");
  if (token) setToken(token);

  return api;
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function deleteToken() {
  localStorage.removeItem("token");
  delete api.defaults.headers.common.Authorization;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
