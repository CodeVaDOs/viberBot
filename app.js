const express = require('express');

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const app = express();

const bot = new ViberBot({
  authToken: "4cc699063f67df1b-b28334184d4dc200-adfff3aa8ea89b2c",
  name: "EchoBot",
  avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

app.use("/viber/webhook", bot.middleware());

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  response.send(message);
});

const https = require('https');
const port = process.env.PORT || 8080;

const webhookUrl = process.env.WEBHOOK_URL;

const httpsOptions = {};
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));


module.exports = app;
