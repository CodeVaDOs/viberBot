const express = require('express');
const bot = require("./bot");

const app = express();

const port = process.env.PORT || 3000;

app.use("/viber/webhook", bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`https://viber-kmrf-bot.herokuapp.com/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});
