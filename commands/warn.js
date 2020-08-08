const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "warn",
    description: "aggiunge una warn all'utente mesionato",

    execute(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Non hai il permesso per farlo!');
        warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let wUser = message.guild.member(message.mentions.users.first());
        console.log(wUser);
        if(!wUser) return message.reply("User Inesistente!");

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        warns[wUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if(err) console.log(err);
        });

        let warnchannel = message.channel;
        if(!warnchannel) return message.reply("impossibile trovare il canale");

        let userName = wUser.user.tag;

        warnchannel.send({
            embed: {
                title: "Warn Aggiunta",
                description: "Warn aggiunta all'utente **" + userName + "**, che attualmente ha **" +
                    warns[wUser.id].warns + "** warnings!",
                color: "#ff1100"
            }
        });

        if(warns[wUser.id].warns == 3)
        {
            message.guild.member(wUser).ban();
            message.channel.send({
                embed: {
                    title: "Utente Bannato",
                    color: "#ff1100",
                    description: `${wUser.user.tag} è stato bannato per aver raggiunto 3 warns.`
                }
            })

            warns[wUser.id] = {
                warns: 0
            };
            fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
                if(err) console.log(err);
            });
        }
    }
}