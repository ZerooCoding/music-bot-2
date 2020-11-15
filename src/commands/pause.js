const { Command } = require('discord.js-akago');

class PauseCommand extends Command {
    constructor() {
        super('pause', {
            description: 'Pauses the currently playing song.',
            category: 'Music',
            aliases: ['pu'],
            guildOnly: true,
            cooldown: 5,
        });
    }

    async execute(message) {
        const { guild, channel } = message;
        const serverQueue = this.client.queue.get(guild.id);
        if (!serverQueue) return channel.send('There is currently no queue for this guild.');
        if (!serverQueue.playing) return channel.send('The music is already paused.');
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
    }
}

module.exports = PauseCommand;