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
  title: "OXI – App de transporte com corridas mais baratas e taxas menores",
  description:
    "Conheça a OXI, aplicativo de transporte com taxas menores para motoristas e corridas mais baratas para passageiros. Uma alternativa moderna ao Uber e 99. Disponível para Android e iOS.",

  keywords: [
    "app de transporte",
    "app de mobilidade",
    "app de corrida",
    "app de transporte barato",
    "app de corrida barata",
    "app de transporte para motoristas",
    "app de transporte para passageiros",
    "aplicativo de corrida",
    "aplicativo de transporte",
    "mobilidade urbana",
    "corridas baratas",
    "alternativa ao uber",
    "app para motoristas",
    "taxas menores motorista",
    "transporte urbano",
    "passageiros",
    "motoristas",
    "oxi mobilidade",
    "Oxxi",
    "oxi",
    "oxi app",
    "oxi transporte",
    "oxi corrida",
    "oxi taxas menores",
    "oxi passageiro",
    "oxi motorista",
  ],

  authors: [{ name: "OXI Mobilidade" }],

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "UUB1eSYFhlrvU3gQr_6jL2MFs-1iFbfmhvmXqOCswUg",
  },

  openGraph: {
    title: "OXI – App de transporte com taxas menores",
    description:
      "Aplicativo de mobilidade urbana com corridas mais baratas para passageiros e mais ganhos para motoristas.",
    url: "https://landing-page-oxi.vercel.app/",
    siteName: "OXI Mobilidade",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "OXI Mobilidade – aplicativo de transporte urbano",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OXI – App de transporte com taxas menores",
    description:
      "Corridas mais baratas para passageiros e taxas menores para motoristas. Conheça a OXI.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
