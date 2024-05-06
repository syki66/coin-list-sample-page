# coin-list-sample-page

암호화폐 리스트 샘플 페이지

![main page](https://github.com/syki66/coin-list-sample-page/assets/59393359/39b2a41f-0e5c-4986-ad0c-4608259b4172)

## 사용된 기술

- React

## 실행 방법

```bash
npm install
```

```bash
npm run start
```

## 프로젝트 구조

`전역`에서 사용되는 스타일은 `App.css`에서 관리하며, `한 곳`에서만 사용되는 스타일은 `css module`을 사용합니다.

### 디렉토리 구조

```
root
├── App.js                      # 라우팅 처리
├── App.css                     # 공통 css
├── .env                        # BASE_URL 관리
└── src
    ├── components              # 공통 컴포넌트
    │   ├── CoinTable               # 테이블
    │   ├── GNB                     # 네비게이션 바
    │   ├── Loader                  # 로딩
    │   └── Toast                   # 토스트
    ├── constants               # 공통 상수
    │   └── errorMessage            # 에러 메세지 상수
    ├── utils                   # 공통 함수
    │   └── common
    └── pages                   # 페이지
        ├── AllCoinList             # 메인 페이지
        ├── BookmarkCoinList        # 북마크 페이지
        └── CoinDetails             # 암호화폐 상세 페이지
```

## 기능 구현

## 참고자료

- https://www.coingecko.com/api/documentations/v3#/
