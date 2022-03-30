const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json')

// 명령어 json 으로 변환
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('say pong~')
].map(command => command.toJSON())
// rest api 객체 만들기 위해 token version 등록
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
