const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json')

// 명령어 json 으로 변환
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('오섬뭐').setDescription('오늘 모험섬 안내'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
