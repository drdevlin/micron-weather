import { Kanit } from 'next/font/google';
import { Background } from '@/components/Background';

import type { Metadata } from "next";

import "./globals.css";

const kanit = Kanit({ weight: ['100', '300'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Micron Weather",
  description: "An incredibly small dose of weather.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.className}>
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}
