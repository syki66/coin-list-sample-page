# coin-list-sample-page

암호화폐 리스트 샘플 페이지 _(현재 coingecko api를 자주 호출하면 api 호출에 제한이 걸려 오류가 발생합니다.)_

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

- `App.js`에서 `react-router-dom`의 `BrowserRouter`로 라우팅 처리했습니다.
- `App.css`은 `전역`에서 사용되는 스타일을 관리하며, 각 컴포넌트 및 페이지에서 사용되는 스타일은 `css module`로 관리합니다.
- `components/` 디렉토리에서 `CoinTable`, `GNB`, `Loader`, `Toast` 컴포넌트를 관리합니다.
- `constants/` 디렉토리는 공통 상수를 관리합니다. 현재는 `에러 메세지 상수`만 존재합니다.
- `pages`
  - `AllCoinList`, `BookmarkCoinList`는 각각 `메인`, `북마크 페이지`로 `GNB` 및 `CoinTable` 컴포넌트를 불러와 페이지를 구성합니다.
  - `CoinDetails`는 코인 상세 페이지입니다.
- `utils/` : 공통 사용 함수
  - `addCommasAndDecimal` : 천의 자리마다 쉼표를 추가하며, 소수점이 .00으로 끝나는 경우에도 표시하는 문자열을 반환합니다.
  - `formatNumber` : 숫자와 통화 및 심볼을 입력받고, addCommasAndDecimal 함수의 반환값과 조합하여 새로운 문자열을 반환합니다.
  - `getPercentColor` : 숫자를 입력받아 양수면 빨간색, 음수면 파란색, 0이면 검정색을 반환합니다.
  - `addCommas` : 숫자를 입력받아 쉼표를 천의 자리마다 추가합니다.
  - `removeCommas` : 문자열을 입력받아 쉼표를 제거합니다.

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
