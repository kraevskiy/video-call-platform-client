import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { QueryProvider } from "@/providers/query.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kraievskyi Video Call platform",
  description: "Kraievskyi Video Call platform offers seamless, high-quality video conferencing solutions for businesses and individuals. Experience crystal-clear video and audio communication, advanced features, and easy-to-use interface for your virtual meetings and collaborations. Join meetings effortlessly from any device, anywhere in the world. Elevate your remote communication experience with Kraievskyi Video Call.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
