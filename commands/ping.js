module.exports = {
    name: 'ping',
    description: 'questo comando ti fa vedere il suo ping,puo servire se il bot non risponde',
    execute(client, message, args) {
        const Discord = require("discord.js")
        const Embed = new Discord.MessageEmbed().setTitle("Boi Status").setColor(message.member.displayHexColor).addFields(
        {name:"Ping",value:client.ws.ping+"ms",inline:true},
        {name:"Uptime",value:client.uptime+" Milliseconds",inline:true},
        )
        message.channel.send(Embed);
    }
}
