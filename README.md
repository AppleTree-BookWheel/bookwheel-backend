# 📚 책바퀴(bookwheel) - Backend

> **책과 타인의 감상을 함께 읽을 수 있는 AI 기반 공유 독서 플랫폼**
---

## 🛠 Tech Stack

| Category | Stack |
| --- | --- |
| **Framework** | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) |
| **Infra** | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) |

---

## 💡 Key Features

### 1. System Architecture & Security
* **Architecture:** 계층형 아키텍처 기반의 RESTful API 설계 및 DB 모델링
* **Auth System:** JWT Access/Refresh Token 기반 인증 로직 및 Redis를 활용한 토큰/세션 관리
* **Email Verification:** Nodemailer + SMTP 프로토콜을 활용한 이메일 인증 시스템 구축

### 2. E-book Core Service
* **Highlight System:** EPUB CFI Range 기반으로 뷰어 내 하이라이트/메모 저장 및 공유 기능 구현
* **Reading Management:** 개인별 독서 진행률 추적 및 도서 평점/리뷰 기능

### 3. Community & Social
* **Reading Party:** 관심사 기반 독서 모임 생성, 가입 및 멤버 관리 시스템
* **Social Network:** 사용자 간 쪽지 송수신 및 친구 맺기 기능 구현

---

## 🚀 Getting Started
이 프로젝트를 로컬 환경에서 실행하는 방법입니다.

```bash
# 1. Clone the repository
$ git clone https://github.com/AppleTree-BookWheel/bookwheel-backend.git

# 2. Install dependencies
$ npm install

# 3. Set Environment Variables
# 루트 경로에 .env 파일을 생성하고 환경변수를 설정하세요.

# 4. Run Infrastructure (Docker)
$ npm run infra:up

# 5. Run Server
$ npm run start:dev
