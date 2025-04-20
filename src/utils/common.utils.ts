import { ApiResponse } from "apisauce";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const uuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const checkEmailFormat = (email: string): boolean => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length && !regexEmail.test(email)) return false;
  else return true;
};

export const snakeToCamelCase = (str: string): string => {
  if (str.includes("_") || str.includes("-"))
    return str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      );

  return str;
};

export interface BaseResponseData<T> {
  statusCode: number;
  message?: string;
  error?: string;
  data: T;
}

export const getDappServicesResponseData = (
  response: ApiResponse<BaseResponseData<any>>
) => {
  const status = response?.status;
  const data = response?.data;

  if (!status || !data) return undefined;

  if (status >= 200 && status <= 300) {
    return response.data;
  } else {
    return undefined;
  }
};

export const getPhantomProvider = () => {
  if (typeof window !== "undefined" && "phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }
};

export const getBackpackProvider = () => {
  if (typeof window !== "undefined" && "backpack" in window) {
    const provider = window.backpack?.solana;

    if (provider?.isBackpack) {
      return provider;
    }
  }
};

export const getSolflareProvider = () => {
  if (typeof window !== "undefined" && "solflare" in window) {
    const provider = window.solflare;

    if (provider?.isSolflare) {
      return provider;
    }
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
