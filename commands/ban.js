const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "ban the mentioned user",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You don't have permission to do that');
        var wUser = message.guild.member(message.mentions.users.first());
        if(!wUser) return message.reply('Non-existent user!');
        message.guild.member(wUser).ban().then(() => {
            message.channel.send({
                embed: {
                    title: "Banned User",
                    color: "#ff1100",
                    description: `**${wUser.user.tag}** was banned by **${message.author.tag}**.`,
                    image: {
                        url: "https://i.imgur.com/8d6Oakt.gif"
                    }
                }
            });
        }).catch(() => {
            message.reply('Unable to ban user');
        })

    }
}
