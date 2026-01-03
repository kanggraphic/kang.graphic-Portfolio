# Sanity CMS 설정 가이드

## ✅ 완료된 작업

1. **HTTP API 통합** - 패키지 의존성 없이 Sanity 데이터 fetch
2. **Sanity Studio 설정** - React 18 호환 (v3 사용)
3. **스키마 생성** - 프로젝트, 아티클, 어바웃 페이지용 스키마

## 📁 프로젝트 구조

```
kang.graphic-Portfolio/
├── lib/sanity.ts          # Sanity HTTP API 클라이언트
├── app/page.tsx           # 서버 컴포넌트 (데이터 fetch)
├── app/HomeClient.tsx     # 클라이언트 컴포넌트 (UI)
└── studio/                # Sanity Studio (별도 앱)
    ├── schemas/
    │   ├── project.ts     # 프로젝트 스키마
    │   ├── article.ts     # 아티클 스키마
    │   └── about.ts       # 어바웃 스키마
    └── package.json
```

## 🚀 Sanity Studio 시작하기

### 1. 로컬에서 Studio 실행

```bash
cd studio
npm install
npm run dev
```

Studio가 `http://localhost:3333`에서 실행됩니다.

### 2. Sanity 로그인

브라우저에서 Studio를 열면 로그인 화면이 나타납니다:
- Sanity 계정으로 로그인
- 프로젝트 `mhicus98` 접근 권한 확인

### 3. 콘텐츠 추가

Studio에서 세 가지 타입의 콘텐츠를 추가할 수 있습니다:

#### Project (프로젝트)
- 제목 (한국어/영어)
- 날짜 (예: 2025-JAN)
- 카테고리 (한국어/영어)
- 태그
- 설명 (한국어/영어)
- 이미지
- Featured 여부

#### Article (아티클)
- 제목 (한국어/영어)
- Slug (URL용)
- 발행일
- 카테고리
- 발췌 (한국어/영어)
- 커버 이미지
- 본문 내용 (한국어/영어)

#### About (프로필)
- 이름
- 역할 (한국어/영어)
- 소개 (한국어/영어)
- 프로필 이미지
- 이메일
- 소셜 링크
- 경력 사항
- 스킬

## 🌐 Studio 배포 (옵션)

Sanity Studio를 온라인에 배포하려면:

```bash
cd studio
npx sanity deploy
```

배포하면 `https://your-studio-name.sanity.studio`에서 접근 가능합니다.

## 🔄 데이터 흐름

```
Sanity Studio (콘텐츠 추가/수정)
    ↓
Sanity Cloud (자동 저장)
    ↓
Next.js (HTTP API로 데이터 fetch)
    ↓
사용자에게 표시
```

## 📝 현재 상태

- ✅ Sanity 프로젝트: `mhicus98`
- ✅ Dataset: `production`
- ✅ HTTP API 연결 준비 완료
- ⏳ 콘텐츠 추가 대기 중 (현재는 mock 데이터 표시)

## 💡 팁

1. **로컬 개발**: Studio와 Next.js 앱을 동시에 실행하면 실시간으로 변경사항 확인 가능
2. **이미지**: Studio에서 이미지를 업로드하면 자동으로 CDN에 저장
3. **Draft**: Studio에서 작성한 내용은 Publish 버튼을 눌러야 사이트에 표시
4. **언어**: 모든 텍스트 필드는 한국어/영어 두 가지 버전 입력 가능

## 🆘 문제 해결

### Studio 접근 권한 오류
- Sanity 계정으로 로그인했는지 확인
- 프로젝트 `mhicus98`에 대한 접근 권한이 있는지 확인

### 데이터가 표시되지 않음
- Studio에서 콘텐츠를 Publish 했는지 확인
- 브라우저 캐시 새로고침 (Ctrl+Shift+R)
- Next.js dev 서버 재시작

### 빌드 에러
- `.env.local` 파일이 있는지 확인
- 환경 변수가 올바른지 확인
