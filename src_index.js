const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привет! 👋\nЯ бот для генерации случайных чисел.\nОтправь мне любое сообщение, и я сгенерирую случайное число от 1 до 100.`));

bot.help((ctx) => ctx.reply(`Я умею генерировать случайные числа.\nПросто отправь мне любое сообщение, например: "Сгенерируй число" 🎲`));

bot.on('text', async (ctx) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    await ctx.reply(`🎲 Случайное число: ${randomNumber}`);
});

module.exports.handler = async function (event) {
    // Функция может вызываться без тела запроса (например, при проверке
    // публичного URL в браузере). Защищаемся от пустого body.
    if (!event || !event.body) {
        return {
            statusCode: 200,
            body: 'OK',
        };
    }

    let message;
    try {
        message = JSON.parse(event.body);
    } catch (error) {
        console.error('Invalid JSON in request body:', error.message);
        return {
            statusCode: 200,
            body: 'OK',
        };
    }

    await bot.handleUpdate(message);
    return {
        statusCode: 200,
        body: '',
    };
};