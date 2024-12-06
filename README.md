# reading-diary

## 첫번째 커밋 베이스(초기 세팅 베이스)
Create react app을 실행하여 세팅
```
yarn create react-app reading-diary --template typescript

yarn add react-router-dom
yarn add -D sass-embedded
yarn add -D prettier
yarn add -D @babel/plugin-proposal-private-property-in-object
```
## spec
- yarn: 1.22.22
- react: v18
- typescript

## 실행 방법
1. yarn install
2. yarn start

## 프로젝트 설명
읽은 책을 기록 하고 저장하는 프로젝트

## page 구성 및 화면
### main
#### url: /

#### page 정의
- 그동안 저장했던 리스트 노출
  - 없다면 리스트 없다고 나옴
  - 리스트 클릭시 상세(/reading/:id)로 이동
- reading diary 추가 버튼

### detail
#### url:/reading/:id

#### page 정의
- 저장했던 reading diary 상세 페이지
- 수정 버튼 클릭시 edit으로 이동

### edit
#### url: /reading/:id/edit

#### page 정의
- 기존 reading 수정하는 페이지

#### new
#### url: /reading/new
- 새로 reading diary를 생성 하는 페이지