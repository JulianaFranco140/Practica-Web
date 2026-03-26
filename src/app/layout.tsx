import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog grupo B",
  description: "Blog para desarrollo web grupo 6 pm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="w-full border-t border-black/[.05] bg-white py-6 text-center text-sm text-zinc-500 dark:border-white/[.05] dark:bg-black">
          <p>Hecho por Juliana y Emanuel, @2026. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
