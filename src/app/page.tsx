import { serviceSections } from "@/brand/content";
import { FullPage, type SectionDef } from "@/components/FullPage";
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
 */
export default function Home() {
  const sections: SectionDef[] = [
    { id: "hero", label: "메인", variant: "light", node: <HeroSection /> },
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
    { id: "stats", label: "숫자로 보는 브랜드", node: <StatsSection /> },
    { id: "join", label: "CARE RITUAL", node: <JoinSection /> },
  ];

  return <FullPage sections={sections} footer={<SiteFooter />} />;
}
