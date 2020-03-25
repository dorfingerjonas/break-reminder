const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
let interval;

client.on('ready', () => {
    console.log('Bot started...');
});

client.on('message', (msg) => {
    if (msg.content === '!break-reminder') {
        msg.channel.send("Bot will now remind you when it's time for a break.");
        const breakTimes = [
            {'time': '08:50', 'sent': false},
            {'time': '09:45', 'sent': false},
            {'time': '10:50', 'sent': false},
            {'time': '11:45', 'sent': false},
            {'time': '12:40', 'sent': false},
            {'time': '13:35', 'sent': false},
            {'time': '14:30', 'sent': false},
            {'time': '15:25', 'sent': false},
            {'time': '16:20', 'sent': false},
            {'time': '17:15', 'sent': false}
        ];

        interval = setInterval(() => {
            const currentDate = new Date();
            const time = `${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}`;

            for (const breakTime of breakTimes) {

                if (breakTime.time === time && !breakTime.sent) {
                    breakTime.sent = true;
                    msg.channel.send("@everyone It's time for a break!");
                }
            }
        }, 1000);
    } else if (msg.content === '!break-reminder-stop') {
        console.log('Bot stopped');
        clearInterval(interval);
    } else if (msg.author.id === '690480395531321364') {
        setTimeout(() => {
            msg.delete().then(() => {
                console.log('message deleted');
            });
        }, 300000);
    }
});

client.login(token);
