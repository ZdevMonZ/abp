import type { NextConfig } from "next";

/**
 * Next.js 설정
 * ---------------------------------------------------------------------------
 * GitHub Pages 는 **서버 없이 파일만** 올려 두는 곳이라, 이 사이트를 미리
 * 완성된 HTML 로 뽑아내야 합니다(`output: "export"` → `out/` 폴더에 생성).
 *
 * 주소가 `https://<계정>.github.io/abp/` 처럼 뒤에 `/abp` 가 붙기 때문에,
 * 그 상태로 빌드하지 않으면 글씨·사진·스타일이 전부 깨집니다.
 * 그래서 GitHub 에서 빌드할 때만 `NEXT_PUBLIC_BASE_PATH=/abp` 를 켜서 앞에 붙입니다.
 * (내 컴퓨터에서 `npm run dev` 로 볼 때는 그대로 `/` 입니다)
 *
 * 저장소 이름을 바꾸면 `.github/workflows/deploy.yml` 의
 * `NEXT_PUBLIC_BASE_PATH: /abp` 를 새 이름으로 고쳐야 합니다.
 */

/**
 * GitHub Actions 로 빌드할 때만 "/abp" 가 들어옵니다
 * (.github/workflows/deploy.yml 에서 넣어 줍니다). 내 컴퓨터에서는 빈 값입니다.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /** 서버 없이 도는 정적 사이트로 뽑아냅니다 */
  output: "export",

  /**
   * 사진 자동 최적화(크기별 WebP 생성)는 서버가 하는 일이라 여기서는 못 씁니다.
   * 원본 파일이 그대로 나가고, 주소 앞에 저장소 이름을 붙이는 일은
   * src/image-loader.ts 가 맡습니다.
   */
  images: { loader: "custom", loaderFile: "./src/image-loader.ts" },

  /** 주소 뒤에 붙는 저장소 이름 */
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : "",

  /** 주소 끝에 / 를 붙여 폴더처럼 만듭니다 (GitHub Pages 에서 더 안전) */
  trailingSlash: true,
};

export default nextConfig;
