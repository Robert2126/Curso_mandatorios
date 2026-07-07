import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aula Mandatorios",
  description: "Plataforma personal de preparacion, practica y autoevaluacion de cursos mandatorios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
