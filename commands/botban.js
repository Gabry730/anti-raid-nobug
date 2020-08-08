const fs = require('fs');
let locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

module.exports = {
	name: 'botban',
	description: 'se attivato banna qualunque bot entri',
	execute(client, message, args) {
        if (!message.guild.ownerID == message.member.id) return message.reply('Solo l\'owner del server può farlo!');

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