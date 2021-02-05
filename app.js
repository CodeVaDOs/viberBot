const express = require('express');

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const app = express();

const bot = new ViberBot({
  authToken: "4cc699063f67df1b-b28334184d4dc200-adfff3aa8ea89b2c",
  name: "EchoBot",
  avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  response.send(message + " МОЙ БОТ");
});

app.use("https://viber-kmrf-bot.herokuapp.com", bot.middleware());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
