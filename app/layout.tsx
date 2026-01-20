import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

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
        className={`${roboto.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <LiquidBackground>
          <div className="flex-1 flex flex-col min-h-screen relative z-10">
            <Header />
            <main className="flex-1">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-8 text-gray-800">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </LiquidBackground>
      </body>
    </html>
  );
}
