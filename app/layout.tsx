import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow mx-4 md:mx-0">{children}</main>
          </div>
          <footer className="w-full flex items-center justify-center py-4 mt-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Link
              isExternal
              className="flex items-center gap-1 text-gray-700 dark:text-gray-300"
              href="https://stufit.in/about"
              title="stufit.in homepage"
            >
              <span className="text-default-600">Copyright</span>
              <p className="text-primary">@2024 Stufit</p>
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
