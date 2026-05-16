<div align="center">

# CHURAI

### *비주류라고? 일단 한번 츄라이!*

</div>

<br/>

## 🙋🏻‍♀️ CHURAI의 FE Developer를 소개합니다!

| <a href="https://github.com/p1001q"><img src="https://avatars.githubusercontent.com/u/201849046?v=4" width="120px;" alt=""/></a> | <a href="https://github.com/kinjaebeom"><img src="https://avatars.githubusercontent.com/u/103941165?v=4" width="120px;" alt=""/></a> | <a href="https://github.com/nue-os"><img src="https://avatars.githubusercontent.com/u/128093404?v=4" width="120px;" alt=""/></a> |
| --- | --- | --- |
| 클랩<br/>박수연 | 꿀범<br/>김재범 | 밤비<br/>김소은 |

<br>

## 📚 서비스 소개

**CHURAI**는 비주류 음식과 개성 있는 레시피를 공유하는 커뮤니티 기반 웹 서비스입니다.

요즘 음식 콘텐츠는 점점 더 대중적인 메뉴와 자극적인 비주얼 중심으로 소비되고 있습니다. 하지만 그 속에서도 사람들은 자신만의 독특한 조합과 취향을 끊임없이 만들어가고 있습니다.

**CHURAI**는 “이거 생각보다 진짜 맛있는데?”라는 경험에서 출발합니다.  
누군가의 취향에서 시작된 비주류 레시피가 또 다른 사람에게는 새로운 발견이 되고, 결국 하나의 음식 문화가 되어가는 과정을 담고자 합니다.

사용자는 자신만의 레시피를 사진과 함께 공유하고, 다른 유저들의 독창적인 조합을 탐색하며 새로운 맛에 도전할 수 있습니다. 단순한 레시피 저장소를 넘어, 서로의 취향을 공유하고 공감하는 음식 커뮤니티를 지향합니다.

**CHURAI**는 비주류라는 이름 아래 숨어 있는 다양한 음식 취향과 창의적인 레시피들을 더 많은 사람들에게 소개하고, “비주류에서 시작해 새로운 주류를 만든다”는 경험을 제공하는 것을 목표로 합니다.

---

# 🍽️ 핵심 기능

### 📸 레시피 업로드
- 음식 사진 업로드
- 나만의 레시피 작성 및 공유

### 🥘 카테고리 분류
- 식사류
- 디저트류

### 💬 커뮤니티 기반 소통
- 다른 유저의 레시피 탐색
- 취향 공유 및 공감

### 🔥 비주류 레시피 발견
- 독특한 음식 조합 탐색
- 새로운 취향 경험

---

# 🎯 타겟

- 자신만의 레시피를 공유하고 싶은 사람
- 새로운 음식 조합을 탐험하고 싶은 사람
- 평범하지 않은 음식 취향을 가진 사람
- 비주류 음식 문화에 관심 있는 사람

---

# 💡 서비스 컨셉

> “이거 생각보다 맛있음. 너도 한번 츄라이.”

비주류 음식에서 시작된 작은 취향이  
누군가에게는 새로운 음식 문화가 될 수 있습니다.

CHURAI는 사람들이 자신만의 음식 취향을 자유롭게 공유하고,  
새로운 맛을 발견하며, 비주류를 함께 즐기는 공간을 만들어갑니다.

---

# 📍 Convention Guide

팀 프로젝트 협업 시 일관된 구조와 커뮤니케이션을 위해 아래 컨벤션을 사용합니다.  
추가하고 싶은 규칙이나 수정 사항이 있다면 자유롭게 제안해주세요!

---

# 🌱 Branch Convention

브랜치는 작업 단위별로 생성합니다.  
브랜치명만 봐도 작업 목적이 보이도록 작성해주세요.

---

## ✅ 규칙

```bash
{type}/{scope}-{short-description}
```

- `type`은 소문자 사용
- `scope`는 가능한 짧게 작성
  - ex) web, admin, api, auth
- `short-description`은 kebab-case 사용
- 한글 브랜치명 사용 금지
- 의미 없는 약어 남발 금지

---

## ✅ Good Examples

```bash
feat/admin-evaluation-create
feat/login-page
fix/web-admin-rewrite
chore/web-add-admin-app-url
refactor/admin-api-client
hotfix/admin-login-redirect
```

---

## ❌ Bad Examples

```bash
admin
feature-1
fix_login
프론트수정
bugFix-admin
```

---

# 📁 Folder Structure

```bash
레포명/
├── 📦 public/
├── 📦 src/
│   ├── 📁 assets
│   │   ├── 📁 images
│   │   └── 📁 icons
│   │
│   ├── 📁 components
│   │   ├── 📁 Button
│   │   │   ├── Button.tsx
│   │   │   └── Button.stories.tsx
│   │   │
│   │   └── 📁 Header
│   │       ├── Header.tsx
│   │       └── Header.stories.tsx
│   │
│   ├── 📁 constants
│   │   └── labels.ts
│   │
│   ├── 📁 hooks
│   │   └── useScroll.ts
│   │
│   ├── 📁 layout
│   │
│   ├── 📁 apis
│   │   ├── recipeApi.ts
│   │   └── api.ts
│   │
│   ├── 📁 pages
│   │   ├── 📁 MainPage
│   │   │   ├── index.tsx
│   │   │   └── 📁 components
│   │   │       └── EventBanner.tsx
│   │   │
│   │   └── 📁 PostDetailPage
│   │       ├── index.tsx
│   │       └── 📁 components
│   │           ├── default.tsx
│   │           └── auction.tsx
│   │
│   ├── 📁 store
│   │   └── UserStore.tsx
│   │
│   ├── 📁 router
│   │   └── index.tsx
│   │
│   ├── 📁 utils
│   │   └── format.ts
│   │
│   ├── 📁 types
│   │   └── user.ts
│   │
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── package.json
├── tsconfig.json
├── .gitignore
├── vite.config.ts
├── .env
└── README.md
```

---

# ✨ Code Styling

## camelCase 사용

변수명과 함수명은 camelCase를 사용합니다.

```tsx
const userName = "hello";

function handleDelete() {}
```

### 규칙

- 첫 글자는 소문자
- 띄어쓰기 없이 다음 단어 시작을 대문자로 작성
- 언더바(`_`) 사용 지양
- 클래스명은 예외 허용

---

# 🌿 Git Flow

```bash
main ← 배포 브랜치
develop ← 개발 브랜치
feature ← 기능 개발 브랜치
```

---

## 📌 브랜치 역할

### main
- 실제 배포 브랜치

### develop
- 개발 통합 브랜치
- feature 브랜치 merge 대상

### feature
- 기능 단위 작업 브랜치

---

## ✨ 작업 흐름

1. `develop` 브랜치에서 feature 브랜치 생성
2. 작업 진행 후 commit
3. Pull Request 생성
4. `develop` 브랜치로 merge

---

# 📝 Commit Convention

## 📌 형식

```bash
커밋유형: 상세설명
```

---

## 📌 커밋 유형

| 타입 | 설명 |
|---|---|
| Init | 프로젝트 초기 세팅 |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Design | UI/CSS 수정 |
| Typing Error | 오타 수정 |
| Docs | 문서 수정 |
| Mod | 폴더 구조 이동 및 파일명 수정 |
| Add | 파일 추가 |
| Del | 파일 삭제 |
| Refactor | 코드 리팩토링 |
| Chore | 빌드, 배포 등 기타 작업 |
| Merge | 브랜치 병합 |

---

## ✅ Example

```bash
Init: 프로젝트 초기 세팅
Feat: 메인 페이지 퍼블리싱
Fix: 로그인 오류 수정
Design: 버튼 hover 스타일 수정
Refactor: api 로직 분리
```

---

# 🔥 PR Convention

## 📌 PR 제목 형식

```bash
커밋유형: 작업 내용
```

### Example

```bash
Feat: 메인 페이지 퍼블리싱
Fix: 로그인 리다이렉트 오류 수정
```

---

# 📋 PR Template

```md
<!-- 제목 형식 -->
<!-- [태그] 작업 요약 -->

## ✨ 작업 내용

작업 내용을 간략하게 설명해주세요.

- UI 겹침 수정
- split view 대응
- 반응형 수정

---

## 💭 코멘트

코드 리뷰가 필요한 부분이나
궁금한 점을 자유롭게 남겨주세요!
```