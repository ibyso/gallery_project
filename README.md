## CHAT-GPT로 생성한 문서입니다.

## 1. Frontend 의존성 설치 및 실행

```bash
cd frontend
npm ci
npm run dev
```

- `npm ci`: `package-lock.json` 기준으로 React, React Router, Tailwind CSS 등의 의존성 일괄 설치
- `npm run dev`: Vite 개발 서버 실행 (접속 주소는 터미널 출력 확인)
- `package-lock.json`이 없다면 최초 설치 시 `npm install` 사용

## 2. Backend 의존성 설치 및 실행

프로젝트 루트 기준으로:

```bash
cd backend
uv sync
uv run fastapi dev
```

- `uv sync`: `pyproject.toml` 및 `uv.lock`을 기준으로 `.venv` 생성 및 FastAPI, SQLAlchemy, Alembic 등의 의존성 설치
- `uv run ...`: 가상환경의 패키지를 사용하여 개발 서버 실행
- FastAPI 실행 경로는 실제 프로젝트 구조에 맞게 변경

## 3. 참고 사항

- **DB 연결 및 Alembic 마이그레이션은 아직 설정하지 않았습니다.** 현재는 의존성 설치 및 개발 서버 실행까지만 진행합니다.

## 4. Git 작업 브랜치 생성

프로젝트 작업은 main 브랜치가 아닌 개인별 작업 브랜치에서 진행합니다.

최초 프로젝트를 Clone한 후 다음 명령어로 개인 브랜치를 생성하고 이동합니다.

# develop 브랜치로 이동

git switch develop

# 최신 코드 가져오기

git pull origin develop

# 개인 브랜치 생성 및 이동

git switch -c <브랜치명>

# 생성한 브랜치를 GitHub에 등록

git push -u origin <브랜치명>

이후 각자의 브랜치에서 개발을 진행하고, 작업 완료 시 Pull Request를 생성하여 develop 브랜치에 병합합니다.
