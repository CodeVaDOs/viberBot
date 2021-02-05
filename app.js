const express = require('express');

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

const app = express();

const bot = new ViberBot({
    authToken: "4cc699063f67df1b-b28334184d4dc200-adfff3aa8ea89b2c",
    name: "Cat Vet Bot",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});

bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});

const SAMPLE_KEYBOARD = {
    "Type": "keyboard",
    "Revision": 1,
    "Buttons": [
        {
            "Columns": 3,
            "Rows": 2,
            "BgColor": "#e6f5ff",
            "BgMedia": "http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",
            "BgMediaType": "picture",
            "BgLoop": true,
            "ActionType": "reply",
            "ActionBody": "Yes"
        }
    ]
};

const message = new KeyboardMessage(SAMPLE_KEYBOARD);

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    console.log("MESSAGE: ", message)
    switch (message.text.toLowerCase()) {
        case "ты чей?":
            response.send(new TextMessage("Мой конечно же"));
            break;
        case "cmd":
            response.send(message)
            break;
        default:
            response.send(new TextMessage(message.text));
    }
});

const port = process.env.PORT || 3000;

app.use("/viber/webhook", bot.middleware());

console.log(process.env)

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`https://viber-kmrf-bot.herokuapp.com/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});
