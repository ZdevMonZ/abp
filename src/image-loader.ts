/**
 * 사진 주소 만들기
 * ---------------------------------------------------------------------------
 * GitHub Pages 주소는 `https://<계정>.github.io/abp/` 처럼 뒤에 저장소 이름이
 * 붙습니다. 그런데 `<Image src="/solion.webp">` 는 그대로 두면 `/solion.webp`
 * (맨 앞 주소)를 찾아가서 사진이 안 나옵니다.
 *
 * 그래서 사진 주소 앞에 `/abp` 를 붙여 주는 것이 이 파일의 역할입니다.
 * next.config.ts 가 이 파일을 사진 담당으로 지정해 두었습니다.
 *
 * 값은 빌드할 때 정해집니다 (.github/workflows/deploy.yml 의 NEXT_PUBLIC_BASE_PATH).
 * 내 컴퓨터에서 볼 때는 비어 있어서 아무것도 안 붙습니다.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  // 이미 전체 주소(http…)이거나 이미 앞에 붙어 있으면 그대로 둡니다
  if (/^https?:\/\//.test(src) || (BASE_PATH && src.startsWith(`${BASE_PATH}/`))) return src;
  return `${BASE_PATH}${src}`;
}
