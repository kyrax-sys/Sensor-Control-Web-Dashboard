import { getToken } from "./auth";

const rawBase = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";
export const SERVER_HTTP = rawBase.replace(/\/$/, "");

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
};
