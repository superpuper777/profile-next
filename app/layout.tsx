import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoldi test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <Header />
          <main className="bg-background-secondary">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
