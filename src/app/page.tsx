"use client";

import { serviceSections, uiText } from "@/brand/content";
import { useText } from "@/brand/locale-store";
import { FullPage, type SectionDef } from "@/components/FullPage";
import { IntroVeil } from "@/components/IntroVeil";
import { LocaleTitle } from "@/components/LocaleTitle";
import { AboutSection } from "@/components/sections/AboutSection";
import { CycleSection } from "@/components/sections/CycleSection";
import { DuoSection } from "@/components/sections/DuoSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JoinSection } from "@/components/sections/JoinSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * 페이지 조립부
 * ---------------------------------------------------------------------------
 * 아래 배열이 화면 순서 그대로입니다.
 *  - 섹션 순서를 바꾸고 싶으면 배열 순서를 바꾸세요.
 *  - 섹션을 빼고 싶으면 해당 줄을 지우세요.
 *  - 새 섹션은 컴포넌트를 만들어 배열에 한 줄 추가하면 끝입니다.
 *
 * label = 오른쪽 점 네비게이션에 뜨는 이름. 언어를 따라가야 하므로
 * 이 파일은 "use client" (브라우저에서 다시 그려지는 화면)로 두었습니다.
 */
export default function Home() {
  const t = useText();

  const sections: SectionDef[] = [
    { id: "hero", label: t(uiText.sectionHero), variant: "light", node: <HeroSection /> },
    { id: "about", label: "ABOUT US", node: <AboutSection /> },
    // SOLION·LUNION 을 한 화면에서 좌우로 대비시키는 섹션
    // (왼쪽은 밝고 오른쪽은 어두워서 상단 메뉴 뒤에 흰 막을 깝니다 → navBackdrop)
    { id: "duo", label: "SOLION × LUNION", tall: true, navBackdrop: true, node: <DuoSection /> },
    { id: "cycle", label: "24H SKIN CYCLE", node: <CycleSection /> },
    ...serviceSections.map((service) => ({
      id: service.id,
      label: service.eyebrow,
      node: <ServiceSection service={service} />,
    })),
    { id: "stats", label: t(uiText.sectionStats), node: <StatsSection /> },
    { id: "join", label: "CARE RITUAL", node: <JoinSection /> },
  ];

  return (
    <>
      {/* 브라우저 탭 제목 — 고른 언어를 따라갑니다 */}
      <LocaleTitle />
      {/* 열림 연출 — 사이트를 열면 화면 전체가 어둠에서 점점 밝아집니다 */}
      <IntroVeil />
      <FullPage sections={sections} footer={<SiteFooter />} />
    </>
  );
}
