const fs = require('fs');
let locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

module.exports = {
	name: 'botban',
	description: 'if activated it bans any bot that enters',
	execute(client, message, args) {
        if (!message.guild.ownerID == message.member.id) return message.reply('Only the server owner can do it!');

        locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

        console.log(locks.botban);
        locks.botban = !locks.botban;
        console.log(locks.botban);

        if(locks.botban) message.reply({
            embed: {
                title: 'Auto Botban Mode On'
            }
        });
        if(!locks.botban) message.reply({
            embed: {
                title: 'Auto Botban Mode Off'
            }
        });
        
        fs.writeFile('./lock.json', JSON.stringify(locks), (err) => {
            if(err) console.log(err);
        });
	},
};
