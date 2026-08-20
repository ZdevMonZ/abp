import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_KR, Poppins } from "next/font/google";
import { brand } from "@/brand/brand";
import { pick } from "@/brand/i18n";
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

/**
 * 검색결과·카톡 미리보기에 쓰이는 제목/설명
 * ---------------------------------------------------------------------------
 * 이 값은 **사이트를 만들 때 한 번** 정해져 파일에 박히므로 언어를 따라가지 못합니다.
 * 그래서 기본 언어(한국어)로 고정합니다.
 *
 * 브라우저 탭 제목(title)은 언어를 따라가야 해서 여기 두지 않고
 * src/components/LocaleTitle.tsx 가 그립니다. (한 곳에서만 그려야 안 부딪힙니다)
 */
const metaTitle = pick(brand.title, "ko");
const metaDescription = pick(brand.description, "ko");

export const metadata: Metadata = {
  description: metaDescription,
  openGraph: {
    type: "website",
    title: metaTitle,
    description: metaDescription,
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
  /**
   * lang="ko" 는 **처음 열릴 때**의 값입니다.
   * 언어를 English 로 바꾸면 화면이 뜬 뒤 lang="en" 으로 바뀝니다
   * (src/brand/locale-store.ts 의 useLocaleSetup).
   */
  return (
    <html lang="ko" className={`${fontKr.variable} ${fontLatin.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
