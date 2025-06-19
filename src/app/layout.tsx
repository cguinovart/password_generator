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
  title: "Generador de Contraseñas Seguras",
  description: "Crea contraseñas fuertes y seguras personalizadas con mayúsculas, números y símbolos.",
  robots: "index, follow",
  openGraph: {
    title: "Generador de Contraseñas",
    description: "Crea contraseñas fuertes y seguras personalizadas con un clic.",
    url: "https://tusitio.com/",
    type: "website",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Generador de Contraseñas",
      },
    ],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}