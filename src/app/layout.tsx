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
  /**
   * ★ 검색 노출 차단 — "링크를 아는 사람만" 보게 하는 설정입니다.
   * 구글·네이버 같은 검색엔진에 이 페이지를 넣지 말라고 알려 줍니다.
   * (비밀번호가 아니라 '요청'입니다. 링크를 받은 사람은 누구나 볼 수 있습니다.)
   *
   * 정식 오픈해서 검색에 뜨게 하고 싶으면 → 아래 robots 줄 4개를 지우세요.
   */
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${fontKr.variable} ${fontLatin.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
