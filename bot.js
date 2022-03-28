const { Client, Intents } = require('discord.js');
const Token = require("./tk")
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg =>{
	if(msg.content == '!ping'){
		msg.channel.send('pong!');
	}
})

client.login(Token);
