const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "warnlevel",
    description: "shows how many warns the named user has",

    execute(bot, message, args) {
        let wUser;
        if(message.mentions.users.first())
        {
            wUser = message.guild.member(message.mentions.users.first());
        }
        else wUser = message.author;
        warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

        let warnlevel = warns[wUser.id].warns;

        message.channel.send(`<@${wUser.id}> he has **${warnlevel}** warns.`);
    }
}
