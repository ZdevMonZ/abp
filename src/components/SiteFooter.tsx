"use client";

import { brand } from "@/brand/brand";
import { uiText } from "@/brand/content";
import { useText } from "@/brand/locale-store";
import { LogoMark } from "@/components/Placeholder";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/**
 * 사이트 푸터
 * ---------------------------------------------------------------------------
 * 섹션이 아니라 마지막에 따라붙는 꼬리 영역입니다.
 * 오른쪽 점 네비게이션에는 잡히지 않습니다.
 */
export function SiteFooter() {
  const t = useText();

  return (
    <footer className="bg-black pt-10 pb-20 md:py-[50px]">
      <div className="mx-auto flex w-full max-w-shell flex-col justify-between gap-8 px-5 md:flex-row md:items-start md:px-10">
        <div>
          <LogoMark wordmark={brand.wordmark} variant="light" className="text-2xl md:text-4xl" />

          <ul className="mt-5 flex gap-8 md:mt-6 md:gap-[50px]">
            {brand.footer.policies.map((policy, i) => (
              <li key={i}>
                <a href={policy.href} className="text-[14px] text-white hover:underline md:text-[16px]">
                  {t(policy.label)}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-col gap-1.5 md:mt-7 md:flex-row md:gap-[25px]">
            <li className="text-[13px] text-ink-mute md:text-[16px]">{t(brand.contact.address)}</li>
            <li className="text-[13px] text-ink-mute md:text-[16px]">
              {t(uiText.inquiry)}{" "}
              <a href={`mailto:${brand.contact.email}`} className="hover:text-white">
                {brand.contact.email}
              </a>
            </li>
          </ul>

          <p className="mt-2 text-[12px] text-[#777] md:mt-3 md:text-[14px]">
            {t(brand.contact.directions)}
          </p>

          {/* 저작권은 왼쪽 아래에 둡니다 — 오른쪽 아래는 화면에 고정된
              플로팅 버튼(카카오·맨 위로) 자리라 글자를 두면 가려집니다. */}
          <p className="mt-8 text-[13px] text-[#777] md:mt-12 md:text-[14px]">
            {brand.footer.copyright}
          </p>
        </div>

        <div className="flex flex-col md:items-end">
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
