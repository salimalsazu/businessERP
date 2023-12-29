import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite.min.css";
import Providers from "@/utils/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR & Admin Module",
  description: "Created by: Salim Al Sazu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
