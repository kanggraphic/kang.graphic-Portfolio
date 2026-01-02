import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kang Graphic Portfolio",
  description: "Newspaper-style portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
