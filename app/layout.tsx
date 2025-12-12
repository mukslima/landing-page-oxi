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
  title: "OXI Mobilidade | Conectando Motoristas e Passageiros",
  description:
    "A OXI é a plataforma de mobilidade que conecta motoristas e passageiros com segurança, rapidez e praticidade. Cadastro simples, economia e liberdade pra se movimentar.",
  keywords: [
    "mobilidade urbana",
    "motorista",
    "passageiro",
    "oxxi",
    "app de mobilidade",
    "corridas",
    "transporte",
    "carona",
  ],
  authors: [{ name: "OXI Mobilidade" }],
  openGraph: {
    title: "OXI Mobilidade",
    description:
      "Conectamos motoristas e passageiros com segurança e praticidade.",
    url: "https://landing-page-oxi.vercel.app/",
    siteName: "OXI Mobilidade",
    images: [
      {
        url: "/logo.png", // depois bota uma imagem tua na pasta public
        width: 1200,
        height: 630,
        alt: "OXI - Plataforma de Mobilidade",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OXI Mobilidade",
    description:
      "A plataforma que conecta motoristas e passageiros com segurança.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
