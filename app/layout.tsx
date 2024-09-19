import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
