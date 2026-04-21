"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { loginWithUsername } from "@/infrastructure/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (username.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    setLoading(true);

    const result = await loginWithUsername(username, password);

    if (!result.ok) {
      setError(result.message ?? "Credenciales invalidas");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
          title="Iniciar sesión"
          description="Ingresa con nombre de usuario y contraseña."
          footerText="¿No tienes cuenta?"
          footerLinkText="Regístrate"
          footerHref="/register"
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
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
