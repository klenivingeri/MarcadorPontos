import { Inter, Roboto } from "next/font/google";
import "./globals.css";

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
  title: "TruScore - Marcados de Pontos e historico de partidas para jogos",
  description: "TruScore - Marcados de Pontos e historico de partidas para jogos",
  manifest: "/manifest.json",
  themeColor: "#000000",
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
    title: "ComandaGo",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
