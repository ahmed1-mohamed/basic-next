import type { Metadata } from "next";
import { Almarai, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clean Next.js App",
  description: "A clean and scalable Next.js application",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${almarai.variable} ${geistMono.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col font-sans ${almarai.className}`}>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
