const {SAMPLE_KEYBOARD} = require("./keyboards");

const BotEvents = require('viber-bot').Events;

const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

const bot = require("./bot");

bot.on(BotEvents.SUBSCRIBED, response => {
  response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  console.log("MESSAGE: ", message)
  switch (message.text.toLowerCase()) {
    case "ты чей?":
      response.send(new TextMessage("Мой конечно же"));
      break;
    case "cmd":
      console.log(new KeyboardMessage(SAMPLE_KEYBOARD))
      response.send(new KeyboardMessage(SAMPLE_KEYBOARD))
      break;
    default:
      response.send(new TextMessage(message.text));
  }
})


module.exports = bot
