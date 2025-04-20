import type { Metadata } from "next";
import { twJoin } from "tailwind-merge";
import { ThemeProvider } from "@/context";
import { Inter, Kumbh_Sans, Fugaz_One } from "next/font/google";

import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MainLayout from "@/components/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbhSans",
});

const fugazOne = Fugaz_One({
  subsets: ["latin"],
  variable: "--font-fugaz-one",
  weight: "400",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        id="body"
        className={twJoin(
          inter.variable,
          kumbhSans.variable,
          fugazOne.variable
        )}
        suppressHydrationWarning={true}
      >
        <MainLayout>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </MainLayout>
      </body>
    </html>
  );
}

interface RootLayoutProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    backpack?: any;
    phantom?: {
      solana: any;
    };
    solflare?: any;
  }
}
