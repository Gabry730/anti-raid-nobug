const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "kicka l'utente mensionato",

    execute(bot, message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Non hai il permesso per farlo!');

        var wUser = message.guild.member(message.mentions.users.first());
        if(!wUser) return message.reply('Utente Inesistente!');
        message.guild.member(wUser).kick().then(() => {
            message.channel.send({
                embed: {
                    title: "Utente Kickato",
                    color: "#ff1100",
                    description: `${wUser.user.tag} è stato kickato da parte di ${message.author.tag}.`
                }
            });
        }).catch(() => {
            message.reply('Impossibile kickare l\'utente');
        })

    }
}
