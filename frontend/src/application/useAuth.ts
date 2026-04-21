import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithUsername, registerWithUsername, logoutCustomSession, getStoredUsername } from "../infrastructure/services/auth.service";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, pass: string) => {
    setError(null);

    if (username.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    setLoading(true);

    const result = await loginWithUsername(username, pass);

    if (!result.ok) {
      setError(result.message ?? "Credenciales invalidas");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const register = async (username: string, pass: string, confirm: string) => {
    setError(null);
    const trimmed = username.trim();

    if (trimmed.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Usa solo letras, numeros y guion bajo (_). ");
      return;
    }

    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (pass !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const result = await registerWithUsername(trimmed, pass);

    if (!result.ok) {
      setError(result.message ?? "No se pudo crear la cuenta.");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  const logout = async () => {
    await logoutCustomSession();
    router.replace("/login");
  };

  const getUsername = () => {
    if (typeof window === "undefined") {
      return null;
    }
    return getStoredUsername();
  }

  return {
    loading,
    error,
    login,
    register,
    logout,
    getUsername,
    setError
  };
};
