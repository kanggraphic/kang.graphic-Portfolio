import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "Editorial Designer Portfolio — Digital Archive",
    template: "%s | Digital Archive"
  },
  description: "디지털 에디토리얼 아카이브 | Kang Graphic - Digital Editorial Archive. 시각 디자인과 리서치를 기반으로 한 편집 디자인 아카이브입니다.",
  keywords: ["Editorial Design", "Graphic Design", "Portfolio", "Digital Archive", "Typography", "Visual Research"],
  authors: [{ name: "Kang Graphic" }],
  creator: "Kang Graphic",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://kang.graphic",
    title: "Editorial Designer Portfolio — Digital Archive",
    description: "시각 디자인과 리서치를 기반으로 한 디지털 에디토리얼 아카이브",
    siteName: "Digital Archive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Designer Portfolio — Digital Archive",
    description: "시각 디자인과 리서치를 기반으로 한 디지털 에디토리얼 아카이브",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
