import axios, { AxiosInstance } from "axios";
import { baseURL } from "../constant";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL,
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token") || "",
    },
  });

  const token = localStorage.getItem("token");
  if (token) setToken(token);

  return api;
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
  api.defaults.headers.common.sysToken = `Bearer ${token}`;
}

export function deleteToken() {
  localStorage.removeItem("token");
  delete api.defaults.headers.common.sysToken;
}

export function useApi(): AxiosInstance {
  if (!api) {
    createApi();
  }
  return api;
}
