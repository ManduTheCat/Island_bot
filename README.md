# 일지
## day1
* [참조 공식 문서](https://discordjs.guide/#before-you-begin)
* 봇은 로그인 되나 정상적으로 핑퐁 작동이 안됨
	* 클라이언트 객체 생성 오류 `discord 13` 으로 오면서 `instents` 를 사용해 권한을 부여해야 봇이 정상적으로 권한대로 행동함
	* 다음과 같이 변경해 해결함
	* `discorde13` 버전 변경점
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
## day2
* 디버깅 편리성을위해 `nodemon` 설치 `package.json` 에 `action` 등록
* 명령을 `slash command` 로 변경하기 위해 `api` 활용해 등록
	* `application.commands` 권한 봇에 추가 같은 봇일 경우 링크 생성하면 자동으로 서버에 등록된다 추후 배포시 권한 축소 필요
	* 명령어 등록은 `deploy-commands.js`에
	* 명령어 `actcion` 은 `app.js` 에 있다 추후 명령어 관리를 위해 `@discord-builder` 활용해 분리할 예정
## day3
* `api` 쓰려 햇는데 마침 점검중이고 하루걸린다 로아와 스크립트 해서 정보 얻어오는 방식으로 변경
* `()=>{}` 와 `function () {}` 의 `this` 범위차이 꺠닿는데 1시간 걸림
* `asynic` 함수`module.expor`t 는 `.then`을 통채로 넘기면 된다
* 메시지 `embed` 형태로 개선 필요
* ```js
	.then(()=>{
			console.log(res)
			interaction.channel.send(res[0]||"None")
			interaction.channel.send(res[1]||"None")
			interaction.channel.send(res[2]||"None")
		})
	```

	* 계속 빈문장입력해서 애러 라 했는데 실제로 출력 도 none 나오고
	[stack overflow solution](https://stackoverflow.com/questions/53907056/how-to-fix-discordapierror-cannot-send-an-empty-message) 로해결
## day4
* null 문제 + 지속적으로 메시지 실패 애러 발생 `JOSON stringify` 로 해결
```js
	} else if(commandName === '오섬뭐'){
		let data = null
		island.then((el)=>{
			data = el
		}).then(()=>{
			interaction.reply(JSON.stringify(data[0].title)+"\n"+JSON.stringify(data[1].title)+"\n"+JSON.stringify(data[2].title))
		})
	}
```
* 다중 서버  /명령어 등록을 위해 config.js guildID-> gildIDs 리스트 로 변경, deploy-commands.js 에서 guildIds 를 map 으로 리스트 파싱
* 글로벌 배포를 하려면 [글로벌 서버 배포 문서](https://discordjs.guide/interactions/slash-commands.html#global-commands)
* 글로벌은 1시간 걸린다 `Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to global commands when they're ready for public use.`
```js
await rest.put(
	Routes.application(clientId),
		{body:commands}
)
```
# day5 2022 5 12
* aws 를 통해 배포 시도  인바운더리 아웃바운더리 http https 다 열었지만 로아와 페이지를 스크래핑을 못하는 이슈 발생
* aws -> google 클라우드로 변경 했다
* 추측
	* 아마 aws 에서 google 페이지 스크레핑이 되는거 보니 aws에서 일부 ip 군을 막은거 같다
	* 인스턴스를 켈리포니아로 만들었는데 구글 클라우드 서울 에서 했더니 됬다. aws 를 한국지역으로 바꿔보는 시도를 해봐야 겠다.
	* 개인적으로 처음 다루는 클라우드이지만 google 클라우드가 aws 보다 훨신 편하다 심지어 콘솔도 제공해준다
* 다음 할일
	* 코드가 너무 지저분하다 프로미스 데이터에서 json으로 딱 빼오고싶다 지금 상태로는 결합도 가 높고 응집도가 낮은 모양인거 같다
	* 모듈 테스트 를 할수 있는 방법을 찾아야겠다 aws 에서 스크래핑이 안되는 현상을 체크 하기 위해 급한데로 testHTML 폴더를 만들어 깃을 통해 코드를 옮겼지만 활용 했지만 덕분에 쓸모 없는 커밋이 너무 많아 졌다.
	* 구글 클라우드 ssh 와 vscode 를 연동 시켜야 한다 config 파일을 지금 사용하느 wsl 우분투에 만들어서  해야하는데 노트북에서 잘안됬다 다시 시도해 봐야겠다.
	* 기능 개발 브랜치를 따로 만들어야겠다
