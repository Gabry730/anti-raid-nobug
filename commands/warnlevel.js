const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "warnlevel",
    description: "mostra quante warns ha l'utente mensionato",

    execute(bot, message, args) {
        let wUser;
        if(message.mentions.users.first())
        {
            wUser = message.guild.member(message.mentions.users.first());
        }
        else wUser = message.author;
        warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

        let warnlevel = warns[wUser.id].warns;

        message.channel.send(`<@${wUser.id}> ha **${warnlevel}** warns.`);
    }
}