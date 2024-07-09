# NOBLY ADMIN APP

<br>

## 프로젝트 소개

<p align="justify">
    <li>기존에 있는 노블리 결혼 정보 웹 사이트를 기반으로 한 리뉴얼 개발</li>
    <li>next.js와 typescript로 클라이언트를 개발하고, vercel로 배포를 한 상태</li>
    <li>postgreSQL 기반으로 한 SQL Database 기능과, Rest API, functions, triggers 등 강력한 기능을 가진 백엔드 서비스 오픈소스, supabase로 관리</li>
</p>

<br>

## 기술 스택

| JavaScript | TypeScript |  React   |  Next   |  vercel   | Supabase |
| :--------: | :--------: | :------: | :-----: | :-------: | :------: |
|   ![js]    |   ![ts]    | ![react] | ![next] | ![vercel] | ![supa]  |

<br>

## 프로젝트 실행
프로젝트를 다운로드 한 뒤

```bash
# 패키지 설치
yarn

# 프로젝트 시작
yarn dev

# 프로젝트 빌드
yarn run build
```

## github 소스 배포

```bash
# git 저장소 경로 설정
git remote add origin [저장소 url]

# git 파일 추가
git add . (ga)

# git 파일 저장 및 작업 내용
git commit -m '[구분] 내용' (gc '[구분]: 내용')

# git 업로드
git push origin main (gpo main)

# git 다운로드
git pull origin main (gpu)
```

## 구현 기능

- 매니저, 회원의 데이터를 저장하고 있는 데이터베이스(supabase) 구축

- supabase Auth(인증) 기능

- next.js의 서버 사이드 렌더링 기능

- sass module 방식을 채택

<br>

## 배운 점 & 아쉬운 점

<p align="justify">
혼자서 NEXT.JS 14 버전의 server-side-rendering(ssr)를 개발하며, typescript의 타입에 대해서도 많이 공부를 했으며, 데이터베이스 서비스 구축, REST API에 대해서 많이 알게되었다. 특히 supabase의 강력한 기능을 사용해 본 경험이 앞으로 큰 도움이 될 것 같다.
</p>

<br>

### 나머지는 소스 코드 참고

## template 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[js]: /public/javascript.svg
[ts]: /public/typescript.svg
[react]: /public/react.svg
[next]: /public/nextjs.svg
[vercel]: /public/vercelmd.svg
[supa]: /public/supabase.svg
