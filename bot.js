const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const vars = require('./vars');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require('./commands/' + file);
    client.commands.set(command.name, command, command.description);
}

// ANTI-DELETE ARRAY channel e ruoli
var listaCanali = [];
var listaRuoli = [];

const token = process.env.TOKEN;
const PREFIX = process.env.PREFIX || '--';

// WARNS
const usersMap = new Map();
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

// LOCK, SAFE MODE
let locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

client.on("error", console.error);
// LOGIN del bot
client.login(token);

const GUILD_ID = process.env.GUILD_ID || vars.GUILD_ID;

// READY
client.once('ready', () => {
    console.log('BOT IS ONLINE!');

    client.user.setActivity('this server', {
        type: 'WATCHING'
    });

    client.guilds.cache.get(GUILD_ID).channels.cache.forEach(channel => {
        listaCanali.push(channel);
    });
    client.guilds.cache.get(GUILD_ID).roles.cache.forEach(ruolo => {
        listaRuoli.push(ruolo);
    });
});

client.on('message', (message) => {
    //-------------------------------------
    // WARNING SYSTEM
    warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    if (usersMap.has(message.author.id)) {
        if (message.author.id == client.user.id) return;
        const userData = usersMap.get(message.author.id);
        let msgCount = userData.msgCount;
        if (parseInt(msgCount) === 5) {
            if (!warns[message.author.id]) warns[message.author.id] = {
                warns: 0
            };
            warns[message.author.id].warns++;
            fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
                if (err) console.log(err);
            });
            message.channel.send({
                embed: {
                    title: "Warn added",
                    description: "Warn added to the user **" + message.author.tag + "** because he spammed, now he currently has **" +
                        warns[message.author.id].warns + "** warnings!",
                    color: "#ff1100"
                }
            });
            if (warns[message.author.id].warns == 3) {
                message.member.ban();
                message.channel.send({
                    embed: {
                        title: "User Banned",
                        color: "#ff1100",
                        description: `${message.author.username} was banned for hitting 3 warns`,
                        image: {
                            url: "https://i.imgur.com/8d6Oakt.gif"
                        }
                    }
                })

                warns[message.author.id] = {
                    warns: 0
                };
                fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
                    if (err) console.log(err);
                });
            }
        } else {
            msgCount++;
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData)
        }
        
    }
    else
    {
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: null
        });
        setTimeout(() => {
            usersMap.delete(message.author.id);
        }, 4000);
    }
    //-------------------------------------

    if (!message.content.startsWith(PREFIX)) return;
    if (message.content == '!si' ||
        message.content == '!no'
    ) return;

    const args = message.content.substring(PREFIX.length).split(' ');

    if (!args[0]) return message.reply('Inserisci un comando');

    if (client.commands.get(args[0].toLowerCase())) client.commands.get(args[0].toLowerCase()).execute(client, message, args);
    else message.reply("comando inesistente!");
});

var daVer = 'da verificare';

client.on('guildMemberAdd', async (member) => {
    locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));
    if (member.user.bot && member.id != client.user.id && locks.botban) {
        member.ban();
    }
});

//---------------------------------------------------
// ANTI-DELETE FUNCTIONS channel e ruoli
client.on('channelCreate', channel => {
    listaCanali.push(channel);
});

client.on('roleCreate', role => {
    listaRuoli.push(role);
});

client.on('channelDelete', async (channel) => {
    locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));
    if (!locks.safe) return;

    var cnl = listaCanali.find(cnl => cnl.id == channel.id);
    cnl.clone();
});

client.on('roleDelete', role => {
    if (!locks.safe) return;
    locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));
    var ruolo = listaRuoli.find(ru => ru.id === role.id);
    var nome = ruolo.name;
    var colore = ruolo.color;
    var perms = ruolo.permissions;

    role.guild.roles.create({
        data: {
            name: nome,
            color: colore,
            permissions: perms
        }
    });
});
//---------------------------------------------------
