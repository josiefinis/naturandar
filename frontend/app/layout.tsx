import type { Metadata } from "next";
import { Amarante, Glass_Antiqua } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";
import SkipLink from "@/components/skip-link";
import Footer from "@/components/footer";
import MainContent from "@/components/main-content";

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
  title: {
    template: "%s | Naturandar",
    default: "Naturandar",
  },
  description: "En samling iakttagelser av naturandar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${amarante.variable} ${glassAntiqua.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <header>
          <MainNav />
        </header>
        <MainContent>{children}</MainContent>
        <Footer />
      </body>
    </html>
  );
}
