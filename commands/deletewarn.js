const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "deletewarn",
    description: "togliere i warns all'utente mesionato",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Non hai il permesso per farlo!');
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

        message.channel.send(`Ora <@${wUser.id}> ha **${warnlevel}** warning(s).`);
    }
}