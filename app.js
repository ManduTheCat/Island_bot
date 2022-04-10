const { Client, Intents, MessageEmbed } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const island = require('./getIslandInfo/getIslands');
const islandTime = require('./getIslandInfo/getIslandTime');

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
		let IslandNameData = null
		let IslandTimeData = null
		islandTime.then((el)=>{
			IslandTimeData = el
		}).then(()=>{
			island.then((el)=>{
				IslandNameData = el
			}).then(()=>{
				console.log(IslandTimeData)
				const exampleEmbed = new MessageEmbed()
				.setTitle("오늘의 모험 섬")
				.addFields(
					{name:"남은 시간",value:String(JSON.stringify(IslandTimeData.remainTime))},
					{name:"첫번째 섬",value:String(JSON.stringify(IslandNameData[0].title)), inline:true},
					{name:"두번째 섬",value:String(JSON.stringify(IslandNameData[1].title)),inline:true},
					{name:"세번째 섬",value:String(JSON.stringify(IslandNameData[2].title)),inline:true},
				)
				interaction.reply({embeds:[exampleEmbed]})
			})

		})

	}
});

client.login(token);
