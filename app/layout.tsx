import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Ariful | Home",
  description: "Developed by Ariful Islam",
  icons: "/favicon.ico",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          GeistSans.variable,
          GeistMono.variable,
          "bg-background text-foreground antialiased",
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider basePath="/api/auth" session={session}>
            <main className="relative flex size-full flex-col">
              <NavBar />
              {children}
              <ShadToaster />
            </main>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
