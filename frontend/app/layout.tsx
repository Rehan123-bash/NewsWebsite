import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { ThemeScript } from "@/components/theme";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "News CMS",
  description: "Admin and public newsroom platform"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
