import type { Metadata } from "next";
import { Amarante, Glass_Antiqua } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";

const amarante = Amarante({
  variable: "--font-amarante",
  weight: "400",
  subsets: ["latin"],
});

const glassAntiqua = Glass_Antiqua({
  variable: "--font-glass-antiqua",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naturandar",
  description: "En samling iakttagelser av naturandar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${amarante.variable} ${glassAntiqua.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <MainNav />
        </header>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
