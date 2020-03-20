const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
let interval;

client.on('message', (msg) => {
    if (msg.content === '!break-reminder') {
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
                    client.guilds.cache.get('687252363446190080').channels.cache.get('687261444869455883').send("@everyone It's time for a break!");
                }
            }
        }, 1000);
    } else if (msg.content === '!break-reminder-stop') {
        clearInterval(interval);
    }
});

client.login(token);