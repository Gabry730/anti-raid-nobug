const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "**unban** [user id] -> unban the user",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You don\'t have permission to do that!');
        var wUser = args[1];
        if (!wUser) return message.reply('Non existent user!');

        try {
            message.guild.members.unban(wUser).then(() => {
                message.channel.send({
                    embed: {
                        title: "Unbanned user",
                        color: "#17fc03"
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }

    }
}
