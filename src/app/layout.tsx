import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import MobileHeader from "@/components/layout/header/MobileHeader";
import Footer from "@/components/layout/footer/Footer";
import { AuthProvider } from "@/context/AuthContext";

const manrope = localFont({
  src: "../font/ManropeFont.ttf",
  variable: "--font-manrope",
});

const inter = localFont({
  src: "../font/InterFont.ttf",
  variable: "--font-inter",
});

const lobster = localFont({
  src: "../font/Lobster.ttf",
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Monsi Engineering",
  description:
    "A website for Monsi Engineering, a company that provides engineering services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${lobster.variable} ${inter.variable} antialiased relative`}
      >
        <AuthProvider>
          <Header />
          <MobileHeader />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

