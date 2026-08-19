#!/usr/bin/env bash
#
# 사이트를 만들어서 GitHub Pages 에 올립니다.
# ---------------------------------------------------------------------------
# 쓰는 법:  npm run deploy
#
# 하는 일
#   1) 정적 사이트로 빌드 → out/ 폴더 생성 (주소 앞에 /abp 가 붙습니다)
#   2) out/ 폴더 통째로 gh-pages 라는 별도 브랜치에 올립니다
#
# gh-pages 브랜치는 "만들어진 결과물"만 담는 곳이라 매번 통째로 덮어씁니다.
# 우리가 쓰는 코드는 main 브랜치에 그대로 있습니다.
#
# 저장소 이름을 바꾸면 아래 BASE_PATH 도 같이 바꿔 주세요.
set -euo pipefail

BASE_PATH="/abp"
BRANCH="gh-pages"

cd "$(dirname "$0")/.."
REMOTE="$(git remote get-url origin)"

echo "▶ 1/3  사이트 만드는 중 (주소 앞에 ${BASE_PATH} 를 붙입니다)…"
rm -rf out
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build

# GitHub Pages 는 이름이 _ 로 시작하는 폴더를 무시합니다.
# Next.js 결과물이 _next/ 라서 이 파일이 없으면 화면이 깨집니다.
touch out/.nojekyll

echo "▶ 2/3  결과물 확인…"
test -f out/index.html || { echo "✗ out/index.html 이 없습니다. 빌드 실패."; exit 1; }
grep -q "${BASE_PATH}/main_high.webp" out/index.html || { echo "✗ 사진 주소에 ${BASE_PATH} 가 안 붙었습니다."; exit 1; }

echo "▶ 3/3  ${BRANCH} 브랜치에 올리는 중…"
(
  cd out
  rm -rf .git
  git init -q
  git config user.name  "$(git -C .. config user.name  || echo 'deploy')"
  git config user.email "$(git -C .. config user.email || echo 'deploy@local')"
  git checkout -qb "$BRANCH"
  git add -A
  git commit -qm "배포 $(git -C .. rev-parse --short HEAD)"
  git push -qf "$REMOTE" "$BRANCH"
  rm -rf .git
)

echo
echo "✓ 완료. 2~3분 뒤 아래 주소에 반영됩니다."
echo "  https://ZdevMonZ.github.io/abp/"
