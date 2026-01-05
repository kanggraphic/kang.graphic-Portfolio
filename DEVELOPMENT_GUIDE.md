# Development Guide & Best Practices

이 문서는 프로젝트 개발 중 겪었던 문제점과 해결 방법을 정리한 가이드입니다.

## 📋 목차

1. [Sanity CMS 통합](#sanity-cms-통합)
2. [TypeScript 타입 안전성](#typescript-타입-안전성)
3. [빌드 타임 에러 처리](#빌드-타임-에러-처리)
4. [환경 변수 설정](#환경-변수-설정)
5. [CI/CD 설정](#cicd-설정)
6. [개발 워크플로우](#개발-워크플로우)

---

## Sanity CMS 통합

### ❌ 발생했던 문제

1. **React 버전 충돌**
   - Sanity v5는 React 18 필요
   - Next.js 14는 React 19 사용
   - 패키지 설치 실패

2. **데이터 페칭 실패**
   - 빌드 타임에 데이터가 없을 때 null 반환
   - `Cannot read properties of null` 에러

3. **Studio 배포 문제**
   - Interactive prompt가 CI/CD에서 작동 안 함
   - Hostname 선택 단계에서 멈춤

### ✅ 해결 방법

#### 1. HTTP API 사용 (패키지 설치 없이)

```typescript
// lib/sanity.ts
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export async function sanityFetch<T>(query: string): Promise<T> {
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  return (await response.json()).result;
}
```

**장점:**
- React 버전 충돌 없음
- 패키지 의존성 최소화
- 빌드 크기 감소

#### 2. 철저한 Null 체크

```typescript
// ❌ 잘못된 예
const projects = await sanityFetch<Project[]>(queries.allProjects);
return <HomeClient projects={projects} />; // projects가 null일 수 있음

// ✅ 올바른 예
let projects: Project[] = [];

try {
  const sanityProjects = await sanityFetch<Project[]>(queries.allProjects);
  if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
    projects = sanityProjects;
  }
} catch (error) {
  console.log('Failed to fetch:', error);
}

return <HomeClient projects={projects || []} />;
```

#### 3. Studio 배포 자동화

**studio/sanity.cli.ts:**
```typescript
export default defineCliConfig({
  api: {
    projectId: 'your-id',
    dataset: 'production'
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME || 'your-hostname',
  deployment: {
    autoUpdates: false,
  }
})
```

**GitHub Actions:**
```yaml
- name: Deploy to Sanity
  run: |
    cd studio
    npx sanity deploy --yes
  env:
    SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}
    SANITY_STUDIO_HOSTNAME: your-hostname
```

---

## TypeScript 타입 안전성

### ❌ 발생했던 문제

1. **Optional Chaining 누락**
   ```typescript
   {project.title.ko}  // title이 undefined면 에러
   {project.tags.map(...)}  // tags가 null이면 에러
   ```

2. **타입 가정 오류**
   ```typescript
   content.split('\n\n')  // content가 string이 아닐 수 있음
   ```

### ✅ 해결 방법

#### 1. Optional Chaining 사용

```typescript
// ❌ 위험
{language === 'ko' ? project.title.ko : project.title.en}

// ✅ 안전
{language === 'ko' ? project.title?.ko : project.title?.en}
```

#### 2. 배열 체크

```typescript
// ❌ 위험
{project.tags.map((tag) => <span>{tag}</span>)}

// ✅ 안전
{project.tags && project.tags.length > 0 && (
  <div>
    {project.tags.map((tag) => <span>{tag}</span>)}
  </div>
)}
```

#### 3. 타입 가드

```typescript
// ❌ 위험
const paragraphs = content.split('\n\n');

// ✅ 안전
const paragraphs = content && typeof content === 'string'
  ? content.split('\n\n')
  : [];
```

#### 4. 안전한 데이터 추출 패턴

```typescript
export default function Component({ data }: { data: any }) {
  if (!data) {
    return <NotFoundView />;
  }

  // Safe extraction with fallbacks
  const title = language === 'ko' ? data.title?.ko : data.title?.en;
  const tags = data.tags || [];
  const images = data.images || [];

  // Use extracted safe data
  return (
    <div>
      {title && <h1>{title}</h1>}
      {tags.length > 0 && <TagList tags={tags} />}
    </div>
  );
}
```

---

## 빌드 타임 에러 처리

### ❌ 발생했던 문제

1. **generateStaticParams가 빈 데이터에 실패**
   ```
   Error occurred prerendering page
   TypeError: Cannot read properties of null
   ```

2. **동적 라우트에서 데이터 없을 때 크래시**

### ✅ 해결 방법

#### 1. generateStaticParams 안전하게 구현

```typescript
// app/article/[slug]/page.tsx
export async function generateStaticParams() {
  try {
    const articles = await sanityFetch<Article[]>(queries.allArticles);

    if (!Array.isArray(articles) || articles.length === 0) {
      return []; // 빈 배열 반환
    }

    return articles.map((article) => ({
      slug: article.slug.current,
    }));
  } catch (error) {
    console.log('Failed to generate params:', error);
    return []; // 에러 시 빈 배열
  }
}
```

#### 2. 페이지 컴포넌트에서 notFound() 사용

```typescript
export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const data = await sanityFetch<Article>(queries.articleBySlug(params.slug));

    if (!data) {
      notFound(); // 404 페이지로
    }

    return <DetailClient data={data} />;
  } catch (error) {
    console.log('Failed to fetch:', error);
    notFound();
  }
}
```

#### 3. 체크리스트

**빌드 전 확인사항:**
- [ ] 모든 `generateStaticParams`가 빈 배열을 안전하게 반환하는가?
- [ ] 모든 데이터 fetch에 try-catch가 있는가?
- [ ] Array.isArray() 체크를 하는가?
- [ ] null/undefined 체크를 하는가?
- [ ] Optional chaining을 사용하는가?

---

## 환경 변수 설정

### ❌ 발생했던 문제

1. **Vercel 환경 변수 누락**
   - 로컬에서는 작동
   - 프로덕션 빌드 실패

2. **NEXT_PUBLIC_ 접두사 누락**
   - 클라이언트 사이드에서 접근 불가

### ✅ 해결 방법

#### 1. 필수 환경 변수 문서화

**.env.example:**
```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### 2. Vercel 설정

**Settings → Environment Variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: 모든 환경 (Production, Preview, Development)
- `NEXT_PUBLIC_SANITY_DATASET`: 모든 환경

**중요:**
- `NEXT_PUBLIC_` 접두사: 클라이언트 사이드에서 접근 가능
- 접두사 없음: 서버 사이드에서만 접근 가능

#### 3. 환경 변수 체크리스트

배포 전 확인:
- [ ] .env.example에 모든 변수가 문서화되어 있는가?
- [ ] Vercel에 모든 변수가 설정되어 있는가?
- [ ] 클라이언트에서 사용할 변수에 NEXT_PUBLIC_ 접두사가 있는가?
- [ ] 민감한 정보(토큰, 시크릿)는 NEXT_PUBLIC_ 없이 설정했는가?

---

## CI/CD 설정

### ❌ 발생했던 문제

1. **GitHub Actions가 interactive 명령 실행 불가**
   - `sanity login` 실패
   - hostname 선택 프롬프트에서 멈춤

2. **Docker 빌드 실패**
   - `sanity-io/github-action-sanity@v0.7-alpha` 불안정

### ✅ 해결 방법

#### 1. 직접 CLI 사용 (GitHub Action 대신)

```yaml
- name: Deploy to Sanity
  run: |
    cd studio
    npx sanity deploy --yes
  env:
    SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}
    SANITY_STUDIO_HOSTNAME: kang-portfolio
```

#### 2. 필요한 Secrets 설정

**GitHub Repository → Settings → Secrets:**
- `SANITY_AUTH_TOKEN`: Sanity 프로젝트에서 생성 (Deploy Studio 권한)

**토큰 생성 방법:**
1. https://sanity.io/manage
2. 프로젝트 선택
3. API → Tokens
4. "Add API token"
5. 권한: "Deploy Studio" 선택

#### 3. 워크플로우 트리거 설정

```yaml
on:
  push:
    branches:
      - main
      - claude/**
    paths:
      - 'studio/**'  # studio 폴더 변경 시에만
  workflow_dispatch:  # 수동 실행 옵션
```

---

## 개발 워크플로우

### 권장 워크플로우

#### 1. 로컬 개발

```bash
# 1. 프로젝트 클론
git clone <repository>
cd kang.graphic-Portfolio

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local 편집

# 3. 의존성 설치
npm install

# 4. 개발 서버 시작
npm run dev

# 5. Studio 개발 (선택)
cd studio
npm install
npm run dev
```

#### 2. 새 기능 개발

```bash
# 1. 새 브랜치 생성
git checkout -b feature/new-feature

# 2. 개발 및 테스트
npm run dev

# 3. 빌드 테스트
npm run build

# 4. 커밋 및 푸시
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
```

#### 3. Sanity 스키마 변경

```bash
# 1. 스키마 파일 수정
# studio/schemaTypes/yourSchema.ts

# 2. TypeScript 인터페이스 동기화
# lib/sanity.ts의 interface 업데이트

# 3. Studio 배포
cd studio
npx sanity deploy

# 또는 GitHub Actions 사용 (자동)
git add studio/
git commit -m "Update schema"
git push
```

#### 4. 체크리스트

**커밋 전:**
- [ ] 로컬 빌드 성공 (`npm run build`)
- [ ] TypeScript 에러 없음 (`npm run build` 확인)
- [ ] 모든 페이지 로드 테스트
- [ ] 데이터 없을 때 동작 확인

**배포 전:**
- [ ] Vercel 환경 변수 확인
- [ ] Sanity 데이터 확인
- [ ] Preview 배포 확인
- [ ] 프로덕션 배포

---

## 일반적인 에러 해결

### 1. "Cannot read properties of null (reading 'map')"

**원인:** 배열이 null/undefined일 때 .map() 호출

**해결:**
```typescript
// Before
{data.items.map(...)}

// After
{data.items && data.items.length > 0 && (
  <div>{data.items.map(...)}</div>
)}
```

### 2. "split is not a function"

**원인:** 문자열이 아닌 값에 .split() 호출

**해결:**
```typescript
// Before
const lines = content.split('\n');

// After
const lines = content && typeof content === 'string'
  ? content.split('\n')
  : [];
```

### 3. "Module not found" (Vercel 빌드)

**원인:** 환경 변수 누락 또는 의존성 문제

**해결:**
1. Vercel 환경 변수 확인
2. `package.json` dependencies 확인
3. `next.config.js` 설정 확인

### 4. Sanity Studio 변경사항 반영 안 됨

**원인:** 브라우저 캐시 또는 배포 안 됨

**해결:**
1. 강제 새로고침 (Ctrl+Shift+R / Cmd+Shift+R)
2. Studio 재배포: `cd studio && npx sanity deploy`
3. GitHub Actions 로그 확인

---

## 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)

---

## 버전 정보

- Next.js: 14.2.35
- React: 19.1
- TypeScript: 5.x
- Node.js: 20.x
- Sanity Studio: 5.1.0 (별도 폴더)

---

**마지막 업데이트:** 2026-01-05
