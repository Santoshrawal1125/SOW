
const API_BASE = import.meta.env.VITE_API_BASE || '/api';


export async function fetchTranslations(lang = 'en') {
  const url = `${API_BASE}/translations?lang=${encodeURIComponent(lang)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch translations (${res.status})`);
  }
  return res.json(); 
}




export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export async function authFetch(input, init = {}) {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });
  return res;
}
