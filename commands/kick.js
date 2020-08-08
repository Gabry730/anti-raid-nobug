const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "kicks the mentioned user",

    execute(bot, message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You don\'t have permission to do that!');

        var wUser = message.guild.member(message.mentions.users.first());
        if(!wUser) return message.reply('Utente Inesistente!');
        message.guild.member(wUser).kick().then(() => {
            message.channel.send({
                embed: {
                    title: "User kicked",
                    color: "#ff1100",
                    description: `${wUser.user.tag} was kicked by${message.author.tag}.`
                }
            });
        }).catch(() => {
            message.reply('Unable to kick user');
        })

    }
}
