const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "banna l'utente mensionato",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Non hai il permesso per farlo!');
        var wUser = message.guild.member(message.mentions.users.first());
        if(!wUser) return message.reply('Utente Inesistente!');
        message.guild.member(wUser).ban().then(() => {
            message.channel.send({
                embed: {
                    title: "Utente Bannato",
                    color: "#ff1100",
                    description: `**${wUser.user.tag}** è stato bannato da parte di **${message.author.tag}**.`,
                    image: {
                        url: "https://i.imgur.com/8d6Oakt.gif"
                    }
                }
            });
        }).catch(() => {
            message.reply('Impossibile bannare l\'utente');
        })

    }
}
