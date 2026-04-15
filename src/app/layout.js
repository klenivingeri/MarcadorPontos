import { Inter, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ServiceWorkerRegistry from "./ServiceWorkerRegistry";
import { GameProvider } from "@/context/GameContext";
import ThemeInitializer from "./ThemeInitializer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500","600", "700", "800", "900"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500","600", "700", "800", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "TruKando - Marcados de Pontos e historico de partidas para jogos",
  description: "TruKando - Marcados de Pontos e historico de partidas para jogos",
  manifest: "/manifest.json",
  color: "#000000",
  background: "#000000",
  icons: {
    apple: [
      {
        url: "logo.png", 
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "TruKando",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5974398786569434"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <GameProvider>
          <ThemeInitializer />
          <ServiceWorkerRegistry />
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
