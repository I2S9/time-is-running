import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const playfullDaily = localFont({
  src: "../fonts/PlayfullDaily.otf",
  variable: "--font-playfull-daily",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Time Is Running",
  description: "Manage your time effectively with our time management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfullDaily.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
