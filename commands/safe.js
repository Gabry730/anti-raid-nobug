const fs = require('fs');
let locks = JSON.parse(fs.readFileSync('./lock.json', 'utf8'));

module.exports = {
	name: 'safe', 
	description: 'if the safe mode is activated when deleting a channel or a role, it will be recreated identical',
	execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to do that!');

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
