import { supabase } from "./supabase";

const SESSION_KEY = "blog_session_token";
const USER_ID_KEY = "blog_user_id";
const USERNAME_KEY = "blog_username";

type RegisterResult = {
  ok: boolean;
  message?: string;
  user_id?: string;
};

type LoginResult = {
  ok: boolean;
  message?: string;
  user_id?: string;
  token?: string;
};

export async function registerWithUsername(username: string, password: string) {
  const trimmed = username.trim();

  const { data, error } = await supabase.rpc("app_register", {
    p_username: trimmed,
    p_password: password,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const result = (data ?? {}) as RegisterResult;

  if (!result.ok) {
    return { ok: false, message: result.message ?? "No se pudo registrar" };
  }

  return { ok: true, userId: result.user_id };
}

export async function loginWithUsername(username: string, password: string) {
  const trimmed = username.trim();

  const { data, error } = await supabase.rpc("app_login", {
    p_username: trimmed,
    p_password: password,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const result = (data ?? {}) as LoginResult;

  if (!result.ok || !result.token) {
    return { ok: false, message: result.message ?? "Credenciales invalidas" };
  }

  localStorage.setItem(SESSION_KEY, result.token);
  if (result.user_id) {
    localStorage.setItem(USER_ID_KEY, result.user_id);
  }
  localStorage.setItem(USERNAME_KEY, trimmed);

  return { ok: true, userId: result.user_id };
}

export async function logoutCustomSession() {
  const token = localStorage.getItem(SESSION_KEY);

  if (token) {
    await supabase.rpc("app_logout", { p_token: token });
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
