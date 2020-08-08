module.exports = {
    name: 'ping',
    description: 'this command shows you its ping, it can be useful if the bot doesn\'t respond',
    execute(client, message, args) {
        const Discord = require("discord.js")
        const Embed = new Discord.MessageEmbed().setTitle("Bot Status").setColor(message.member.displayHexColor).addFields(
        {name:"Ping",value:client.ws.ping+"ms",inline:true},
        {name:"Uptime",value:client.uptime+" Milliseconds",inline:true},
        )
        message.channel.send(Embed);
    }
}
