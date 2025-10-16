
const API_BASE = import.meta.env.VITE_API_BASE || '/api';


export async function fetchTranslations(lang = 'en') {
  const url = `${API_BASE}/translations?lang=${encodeURIComponent(lang)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch translations (${res.status})`);
  }
  return res.json(); 
}
