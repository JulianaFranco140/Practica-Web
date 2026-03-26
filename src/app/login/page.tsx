"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          description="Accede para publicar y gestionar tus ideas."
          footerText="¿No tienes cuenta?"
          footerLinkText="Regístrate"
          footerHref="/register"
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="mt-2 w-full">
              Entrar
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
