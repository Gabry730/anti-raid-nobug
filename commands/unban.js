const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "**unban** [user id] -> sbanna l'utente",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Non hai il permesso per farlo!');
        var wUser = args[1];
        if (!wUser) return message.reply('Utente Inesistente!');

        try {
            message.guild.members.unban(wUser).then(() => {
                message.channel.send({
                    embed: {
                        title: "Utente Sbannato",
                        color: "#17fc03"
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }

    }
}