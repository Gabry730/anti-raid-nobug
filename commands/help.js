module.exports = {
	name: 'help',
	description: 'standar help command',
	execute(client, message) {
		const embed = {
			embed: {
				title: 'Commands',
				fields: [],
				color: '#86A3B3',
			},
		};

		client.commands.forEach((cmd) => {
			if(cmd.name == 'help') return;
			embed.embed.fields.push({
				name: '`' + cmd.name + '`',
				value: cmd.description,
			});
		});
		console.log(embed);
		message.reply(embed);
	},
};