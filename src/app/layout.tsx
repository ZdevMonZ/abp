import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_KR, Poppins } from "next/font/google";
import { brand } from "@/brand/brand";
import "./globals.css";

/**
 * 폰트
 * ---------------------------------------------------------------------------
 * 원본은 Pretendard(한글) + Poppins(영문) 조합입니다.
 * Pretendard 는 Google Fonts 에 없어서, 같은 결의 Noto Sans KR 로 대체했습니다.
 * 다른 폰트로 바꾸려면 아래 import 두 줄만 교체하면 됩니다.
 */
const fontKr = Noto_Sans_KR({
  variable: "--font-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontLatin = Poppins({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: brand.title,
  description: brand.description,
  openGraph: {
    type: "website",
    title: brand.title,
    description: brand.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${fontKr.variable} ${fontLatin.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
