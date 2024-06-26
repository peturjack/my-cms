import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<ThemeProvider attribute="class" defaultTheme="system">*/}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <UserProvider>
            <Navbar />
          </UserProvider>
          {children}
        </ThemeProvider>
      </body>
      {/*</ThemeProvider>*/}
    </html>
  );
}
