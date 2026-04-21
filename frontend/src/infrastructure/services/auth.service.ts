const SESSION_KEY = "blog_session_token";
const USER_ID_KEY = "blog_user_id";
const USERNAME_KEY = "blog_username";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function registerWithUsername(username: string, password: string) {
  const trimmed = username.trim();
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: trimmed,
      password,
    }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    message?: string;
    userId?: string;
  };

  if (!response.ok || !data.ok) {
    return { ok: false, message: data.message ?? "No se pudo registrar" };
  }

  return { ok: true, userId: data.userId };
}

export async function loginWithUsername(username: string, password: string) {
  const trimmed = username.trim();

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: trimmed,
      password,
    }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    message?: string;
    userId?: string;
    token?: string;
  };

  if (!response.ok || !data.ok || !data.token) {
    return { ok: false, message: data.message ?? "Credenciales invalidas" };
  }

  localStorage.setItem(SESSION_KEY, data.token);
  if (data.userId) {
    localStorage.setItem(USER_ID_KEY, data.userId);
  }
  localStorage.setItem(USERNAME_KEY, trimmed);

  return { ok: true, userId: data.userId };
}

export async function logoutCustomSession() {
  const token = localStorage.getItem(SESSION_KEY);

  if (token) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export function getStoredSessionToken() {
  return localStorage.getItem(SESSION_KEY);
}

export function getStoredUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function getStoredUsername() {
  return localStorage.getItem(USERNAME_KEY);
}
