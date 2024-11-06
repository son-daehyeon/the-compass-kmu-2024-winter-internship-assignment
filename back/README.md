## 기술 스택

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/son-daehyeon/the-compass-2024-winter-internship-assignment.git

# 의존성 설치
npm install # 또는 yarn install, pnpm install

# 환경 변수 설정
cp .env.example .env
```

### 환경 변수 설정

`.env` 파일에 다음 환경 변수를 설정하세요:

```env
SERVER_PORT=3000

MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USERNAME=root
MONGODB_PASSWORD=root
MONGODB_AUTH_SOURCE=admin
MONGODB_DATABASE=the-compass-2024-winter-internship-assignment
```

### 실행

```bash
# 개발 모드
npm run start:dev # 또는 yarn start:dev, pnpm start:dev

# 프로덕션 모드
npm run start # 또는 yarn start, pnpm start

# 테스트
npm run test # 또는 yarn test, pnpm test
```

## API 엔드포인트

### 프로젝트

- `POST /projects` - 새 프로젝트 생성
- `GET /projects` - 모든 프로젝트 조회
- `GET /projects/:projectId` - 특정 프로젝트 조회
- `DELETE /projects/:projectId` - 프로젝트 삭제

### 태스크

- `POST /projects/:projectId/tasks` - 새 태스크 생성
- `GET /projects/:projectId/tasks` - 프로젝트의 모든 태스크 조회
- `PUT /projects/:projectId/tasks/:taskId` - 태스크 수정
- `DELETE /projects/:projectId/tasks/:taskId` - 태스크 삭제

## 요청/응답 예시

### 프로젝트 생성

```bash
# 요청
POST /projects
Content-Type: application/json

{
  "title": "새 프로젝트",
  "description": "프로젝트 설명"
}

# 응답
{
  "error": false,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "새 프로젝트",
    "description": "프로젝트 설명"
  }
}
```

### 태스크 생성

```bash
# 요청
POST /api/projects/507f1f77bcf86cd799439011/tasks
Content-Type: application/json

{
  "pjId": "507f1f77bcf86cd799439011",
  "title": "새 태스크",
  "description": "태스크 설명",
  "priority": "HIGH",
  "dueDate": "2024-12-31"
}

# 응답
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "pjId": "507f1f77bcf86cd799439011",
    "title": "새 태스크",
    "description": "태스크 설명",
    "priority": "HIGH",
    "status": "NOT_STARTED",
    "dueDate": "2024-12-31T00:00:00.000Z"
  }
}
```

## 에러 처리

모든 에러 응답은 다음 형식을 따릅니다:

```json
{
  "error": "에러 메시지",
  "data": null,
}
```