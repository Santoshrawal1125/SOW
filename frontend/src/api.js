
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function normalizeUrl(u) {

  return String(u).trim().replace(/\s+/g, '');
}

function getCookie(name) {
  const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return match ? match.pop() : '';
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}
export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}
export function setTokens(access, refresh) {
  if (access) localStorage.setItem('accessToken', access);
  if (refresh) localStorage.setItem('refreshToken', refresh);
  localStorage.setItem('tokenObtainedAt', String(Date.now()));
}
export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenObtainedAt');
}


const REFRESH_ENDPOINT = `${API_BASE}/auth/refresh/`; 


const ACCESS_TOKEN_FIELD = 'access';   
const REFRESH_TOKEN_FIELD = 'refresh'; 


export const USE_CREDENTIALS = false; 

// Refresh / queue logic 
let isRefreshing = false;
let refreshPromise = null;

async function doRefresh() {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error('No refresh token available');
  }

  const res = await fetch(normalizeUrl(REFRESH_ENDPOINT), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }), 

    credentials: USE_CREDENTIALS ? 'include' : 'same-origin',
  });

  if (!res.ok) {
    // refresh failed
    throw new Error('Refresh failed');
  }

  const data = await res.json();
  const newAccess = data[ACCESS_TOKEN_FIELD] || data.accessToken || data.token || null;
  const newRefresh = data[REFRESH_TOKEN_FIELD] || data.refreshToken || null;

  if (!newAccess) {
    throw new Error('Refresh response did not contain new access token');
  }

  setTokens(newAccess, newRefresh || refresh); 
  return newAccess;
}


export async function authFetch(input, init = {}) {
  const originalUrl = typeof input === 'string' ? normalizeUrl(input) : (input.url ? normalizeUrl(input.url) : String(input));
  const method = (init.method || (input.method || 'GET')).toUpperCase();


  const headers = new Headers(init.headers || (input.headers || {}));
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }


  if (USE_CREDENTIALS && !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) headers.set('X-CSRFToken', csrftoken);
  }


  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const finalInit = {
    ...init,
    headers,
    credentials: USE_CREDENTIALS ? 'include' : (init.credentials || 'same-origin'),
  };


  async function doRequest() {
    return fetch(originalUrl, finalInit);
  }

  let res = await doRequest();


  if (res.status === 401) {

    if (isRefreshing) {
      try {
        await refreshPromise; 
      } catch (e) {
 
        clearTokens();
        throw e;
      }
    } else {
      // start refresh
      isRefreshing = true;
      refreshPromise = doRefresh()
        .then((newAccess) => {
          isRefreshing = false;
          refreshPromise = null;
          return newAccess;
        })
        .catch((err) => {
          isRefreshing = false;
          refreshPromise = null;
          clearTokens();
          throw err;
        });
      try {
        await refreshPromise;
      } catch (err) {
        // refresh failed
        throw err;
      }
    }

    // after refresh completes successfully, retry original request with new token
    const newToken = getAccessToken();
    if (newToken) {
      finalInit.headers = new Headers(finalInit.headers || {});
      finalInit.headers.set('Authorization', `Bearer ${newToken}`);
    } else {
      // no token - fail
      throw new Error('No access token after successful refresh');
    }

    res = await fetch(originalUrl, finalInit);
    return res;
  }


  return res;
}


export async function fetchTranslations(lang = 'en') {
  const url = normalizeUrl(`${API_BASE}/translations?lang=${encodeURIComponent(lang)}`);
  const res = await fetch(url, { credentials: USE_CREDENTIALS ? 'include' : 'same-origin' });
  if (!res.ok) {
    throw new Error(`Failed to fetch translations (${res.status})`);
  }
  return res.json();
}
