const { Client, Intents, MessageSelectMenu } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const island = require('./getIslands');

client.once('ready',()=>{
	console.log(`ready ${client.user.tag}`)

})
client.on('interactionCreate', async interaction =>{
	if(!interaction.isCommand()) return;
	const {commandName} = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`서버이름 : ${interaction.guild.name}\n사용자 수 :${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`유저이름 : ${interaction.user.username}`);
	} else if(commandName === '오섬뭐'){
		const data = island;
		let res = []
		data.then((el)=>{el.forEach((islandData)=>{
			res.push(islandData.title)
			// console.log(islandData.title)

			})
		}).then(()=>{
			console.log(res)
			//이거 왜됨?

			interaction.channel.send(res[0]||"None")
			interaction.channel.send(res[1]||"None")
			interaction.channel.send(res[2]||"None")
		})

	}
});

client.login(token);
