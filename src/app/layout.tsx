import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import "./globals.css";

const playfullDaily = localFont({
  src: "../fonts/PlayfullDaily.otf",
  variable: "--font-playfull-daily",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Time is running",
  description: "Manage your time effectively with our time management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfullDaily.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
