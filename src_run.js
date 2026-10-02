const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привет! 👋\nЯ бот для генерации случайных чисел.\nОтправь мне любое сообщение, и я сгенерирую случайное число от 1 до 100.`));

bot.help((ctx) => ctx.reply(`Я умею генерировать случайные числа.\nПросто отправь мне любое сообщение, например: "Сгенерируй число" 🎲`));

bot.on('text', async (ctx) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    await ctx.reply(`🎲 Случайное число: ${randomNumber}`);
});

// Long polling: бот сам опрашивает Telegram, публичный URL не нужен
bot.launch()
    .then(() => {
        console.log('Бот запущен и слушает обновления (long polling)');
    })
    .catch((error) => {
        console.error('Ошибка запуска бота:', error);
        process.exit(1);
    });

// Корректная остановка
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));