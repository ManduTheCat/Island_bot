const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildIds, token} = require('./config.json')

// 명령어 json 으로 변환
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('오섬뭐').setDescription('오늘 모험섬 안내'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

//즉시실행 함수로 then catch  필요 없게 된다. await 으로 묶을땐 try 로 묶어야한다
(async ()=>{
	guildIds.map(async(guildId)=>{
		try{
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
			console.log(`${guildId}dicsord api 에 슬래쉬 명령어 등록 성공`)
		}
		catch(error){
			console.error(error);
		}
	});
})();

