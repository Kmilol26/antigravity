import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NavigationWrapper } from "@/components/NavigationWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Tikipal Platform",
  description: "Management platform for entertainment businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className={`${roboto.variable} font-sans antialiased min-h-screen bg-background flex flex-col`}
      >
        <Header />
        <NavigationWrapper />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto w-full py-8 text-gray-800">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
