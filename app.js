const { Client, Intents } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', ()=>{
	console.log(`ready ${client.user.tag}`)
})
client.on('interactionCreate', async interaction =>{
	if(!interaction.isCommand()) return;
	const {commandName} = interaction;

	if(commandName == 'ping'){
		await interaction.reply('pong!');
	}
});

client.login(token);
