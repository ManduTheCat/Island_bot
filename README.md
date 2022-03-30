# 일지
* [참조 공식 문서](https://discordjs.guide/#before-you-begin)
* 봇은 로그인 되나 정상적으로 핑퐁 작동이 안됨
	* 클라이언트 객체 생성 오류 discord 13 버넞으로 오면서 instents 를 사용해 권한을 부여해야 봇이 정상적으로 권한대로 행동함
	* 다음과 같이 변경해 해결함
	* discode13 버전 변경점
	```js
	const client = new Client();
	```

	```js
	const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
	```
* 보안을 위해 토큰 을 모듈화 시키는중  `export` 는 `import` 사용 `moudle.export` 는 `require` 사용 해야함을 알아냄

	* `node` 에서 단순 `export` 사용시 `package.js` 에 `"type" : "module"` 추가후 사용가능
	* `gitignore` 를 활용해 토큰 을 `git` 에 업로드 안할예정
	* [자바스크립트 CommonJS 모듈 내보내기/불러오기 (require)](https://www.daleseo.com/js-module-require/#:~:text=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EA%B0%9C%EB%B0%9C%EC%9D%84%20%ED%95%98%EB%8B%A4,%EC%83%88%EB%A1%AD%EA%B2%8C%20%EB%8F%84%EC%9E%85%EB%90%9C%20%ED%82%A4%EC%9B%8C%EB%93%9C%EC%9E%85%EB%8B%88%EB%8B%A4.)
	* [reqire, import](https://velog.io/@bacccine/%ED%8C%8C%EC%9D%BC-%EC%88%98%EC%A0%95%EA%B8%B0)
	* [Getting Unexpected Token Export, stack over flow](https://stackoverflow.com/questions/38296667/getting-unexpected-token-export)

* 디버깅 편리성을위해 `nodemon` 설치 `package.json` 에 `action` 등록
* 명령을 `slash command` 로 변경하기 위해 `api` 활용해 등록
	* `application.commands` 권한 봇에 추가
	* 명령어 등록은 `deploy-commands.js`에
	* 명령어 `actcion` 은 `app.js` 에 있다 추후 명령어 관리를 위해 `builder` 활용해 분리할 예정
