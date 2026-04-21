"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { registerWithUsername } from "@/infrastructure/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const result = await registerWithUsername(trimmed, password);

    if (!result.ok) {
      setError(result.message ?? "No se pudo crear la cuenta.");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 font-sans text-foreground dark:bg-black sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Volver
        </Link>
        <AuthCard
          title="Crear cuenta"
          description="Regístrate con nombre de usuario y contraseña."
          footerText="¿Ya tienes cuenta?"
          footerLinkText="Inicia sesión"
          footerHref="/login"
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error ? (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/25 dark:text-red-300">
                {error}
              </p>
            ) : null}
            <TextField
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              placeholder="tu_usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <TextField
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarme"}
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
