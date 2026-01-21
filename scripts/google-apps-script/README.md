# Google Apps Script Installation Guide

## Setup Instructions

### 1. 구글 시트 설정

1. 구글 시트를 엽니다: [KANG_GRAPHIC_CMS_Schema](https://docs.google.com/spreadsheets/d/1RyRf91vR6pGaofJigEolyFYp1o26D_lps6PptdjK-80)

2. **Visibility 컬럼 추가** (중요!):
   - `Project` 시트의 첫 번째 컬럼 앞에 `visibility` 추가 (체크박스 타입)
   - `Article` 시트의 첫 번째 컬럼 앞에 `visibility` 추가 (체크박스 타입)
   - 기본값: `TRUE` (체크됨 = 공개, 체크 해제 = 숨김/삭제)

### 2. Google Apps Script 설치

1. 구글 시트에서: **확장 프로그램** → **Apps Script**
2. 새 프로젝트 생성됨
3. 기본 `Code.gs` 파일 삭제
4. `sync-to-sanity.gs` 파일의 전체 내용을 복사하여 붙여넣기
5. 파일명을 `sync-to-sanity`로 변경
6. **저장** (Ctrl+S 또는 Cmd+S)

### 3. 환경 변수 설정

Apps Script 에디터에서:
1. 왼쪽 메뉴 **프로젝트 설정** (톱니바퀴 아이콘) 클릭
2. 아래로 스크롤하여 **스크립트 속성** 섹션 찾기
3. **스크립트 속성 추가** 클릭하고 다음 값들 입력:

| 속성 | 값 |
|------|-----|
| `SANITY_PROJECT_ID` | `mhicus98` |
| `SANITY_DATASET` | `production` |
| `SANITY_TOKEN` | Sanity API 토큰 (아래 참조) |
| `VERCEL_DEPLOY_HOOK` | Vercel Deploy Hook URL (아래 참조) |

### 4. Sanity API 토큰 생성

1. [Sanity.io](https://sanity.io) 로그인
2. 프로젝트 선택 (`mhicus98`)
3. **API** 탭 클릭
4. **Tokens** → **Add API token**
5. 이름: `Google Sheets Sync`
6. 권한: **Editor** 선택
7. 토큰 복사하여 스크립트 속성에 붙여넣기

### 5. Vercel Deploy Hook 생성

1. [Vercel](https://vercel.com) 대시보드 로그인
2. 프로젝트 선택 (`kang.graphic-Portfolio`)
3. **Settings** → **Git** → **Deploy Hooks**
4. **Create Hook**
   - Name: `Sanity CMS Sync`
   - Branch: `main` (또는 배포 브랜치)
5. URL 복사하여 스크립트 속성에 붙여넣기

### 6. 권한 승인 및 트리거 설정

1. Apps Script 에디터 상단에서 함수 드롭다운 클릭
2. **setupTriggers** 선택
3. **실행** 버튼 클릭 (▶️)
4. 권한 요청 팝업:
   - **권한 검토** 클릭
   - Google 계정 선택
   - **고급** → **안전하지 않은 페이지로 이동** 클릭
   - **허용** 클릭

5. 완료! 이제 자동 동기화가 활성화되었습니다.

## 사용 방법

### 자동 동기화
- 시트의 데이터를 수정하면 2초 후 자동으로 Sanity에 동기화됩니다.
- 동기화 완료 후 자동으로 Vercel 배포가 트리거됩니다.

### 수동 동기화
1. 구글 시트 메뉴에 **🔄 Sanity Sync** 메뉴 생성됨
2. 옵션:
   - **Sync All**: 모든 시트 동기화
   - **Sync Categories Only**: 카테고리만
   - **Sync Clients Only**: 클라이언트만
   - **Sync Projects Only**: 프로젝트만
   - **Sync Articles Only**: 아티클만
   - **Test Vercel Deploy**: Vercel 배포 테스트

## 데이터 형식

### Project 시트 컬럼 순서
```
year | titleKr | titleEn | slug | category | tags | descriptionKr | 
descriptionEn | contentKr | contentEn | coverImage | galleryImages | 
featured | client | collaborators | externalLink | visibility
```

### Article 시트 컬럼 순서
```
publishedAt | titleKr | titleEn | slug | category | excerptKr | 
excerptEn | contentKr | contentEn | coverImage | author | visibility
```

### Category 시트 컬럼 순서
```
nameKr | nameEn | slug | color | order
```

### Client 시트 컬럼 순서
```
nameKr | nameEn | slug | logo | website
```

## 이미지 처리

- **이미지 URL**: 공개적으로 접근 가능한 이미지 URL 입력
- **여러 이미지**: 쉼표로 구분 (예: `url1,url2,url3`)
- 자동으로 Sanity Assets에 업로드됨

## 문제 해결

### 동기화가 안 될 때
1. Apps Script 에디터에서 **실행 로그** 확인
2. Sanity 토큰이 올바른지 확인
3. 시트 컬럼 순서가 정확한지 확인

### 이미지 업로드 실패
- 이미지 URL이 공개적으로 접근 가능한지 확인
- 이미지 파일 크기 확인 (10MB 이하 권장)

### Vercel 배포 안 됨
- Deploy Hook URL이 올바른지 확인
- Vercel 프로젝트가 활성 상태인지 확인

## 고급 설정

### 동기화 지연 시간 조정
`onSheetChange` 함수의 `Utilities.sleep(2000)` 값을 조정 (밀리초 단위)

### Visibility 동작
- `TRUE` (체크됨): 문서가 Sanity에 생성/업데이트됨
- `FALSE` (체크 해제): 문서가 Sanity에서 삭제됨
