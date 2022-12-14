import axios, { AxiosInstance } from "axios";
import i18next from "i18next";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL: "http://api.sahabanft.com.ly/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {
      locale: i18next.language || "en",
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

function setChaidId() {
  if (import.meta.env.MODE === "development") return;
  api.defaults.params.chainId = window?.ethereum?.networkVersion || 1;
}

export function useApi() {
  if (!api) {
    createApi();
  }

  setChaidId();

  return api;
}
