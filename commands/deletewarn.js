const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "deletewarn",
    description: "remove the warns from the user",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You don\'t have permission to do that!');
        let wUser = message.guild.member(message.mentions.users.first());
        if(!wUser) return message.reply("user non esistente!");

        warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        
        warns[wUser.id] = {
            warns: 0
        };

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if(err) console.log(err);
        });

        let warnlevel = warns[wUser.id].warns;

        message.channel.send(`Now <@${wUser.id}> he has **${warnlevel}** warning(s).`);
    }
}
