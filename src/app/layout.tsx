import type { Metadata } from "next";
import { Geist, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const retroFont = VT323({
  variable: "--font-retro",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "José Pérez · SysAdmin Quest — CV Interactivo",
  description:
    "Recorre la carrera de José Pérez (Sysadmin · Jr. DevOps · Soporte L2) a través de 8 niveles interactivos inspirados en cada rol real. Desbloquea habilidades, gana XP y descubre el CV completo.",
  keywords: [
    "José Pérez",
    "Sysadmin",
    "DevOps",
    "Jr. DevOps",
    "Soporte L2",
    "Linux",
    "Docker",
    "AWS",
    "cPanel",
    "Jenkins",
    "PHP",
    "Laravel",
    "Zabbix",
    "CV interactivo",
    "portafolio",
    "Venezuela",
  ],
  authors: [{ name: "José Pérez" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "José Pérez · SysAdmin Quest — CV Interactivo",
    description:
      "Recorre 10+ años de carrera DevOps/Sysadmin en un videojuego web. 8 niveles, 50 habilidades, 1 CV interactivo.",
    url: "https://chat.z.ai",
    siteName: "SysAdmin Quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "José Pérez · SysAdmin Quest",
    description: "CV interactivo en formato videojuego web — 8 niveles inspirados en roles reales.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${pixelFont.variable} ${retroFont.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
