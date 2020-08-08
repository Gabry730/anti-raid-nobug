const fs = require('fs');
let locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

module.exports = {
	name: 'safe', 
	description: 'se attivata la modalità safe quando si cancellerà un canale o un ruolo, questo verrà ricreato identico',
	execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Non hai il permesso per farlo!');

        locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

        console.log(locks.safe);
        locks.safe = !locks.safe;
        console.log(locks.safe);

        if(locks.safe) message.reply({
            embed: {
                title: 'Safe Mode On'
            }
        });
        if(!locks.safe) message.reply({
            embed: {
                title: 'Safe Mode Off'
            }
        });
        
        fs.writeFile('./lock.json', JSON.stringify(locks), (err) => {
            if(err) console.log(err);
        });
	},
};