const TelegarmApi = require('node-telegram-bot-api')
const {gameOptions,againOptions}=require('./options')
const token ='5355793921:AAGVsXEBwOHtgkgs-7XQAnX5fDCY4KKFWYg'

const  bot = new TelegarmApi(token,{polling:true})

const chats={}


const startGame = async (chatId)=>{
    await bot.sendMessage(chatId, 'Давай сыграем! Отгадай число от 0 до 9');
    const randomNumber = Math.floor(Math.random()*10);
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId,'от 0 до 9',gameOptions);
}

const start=()=>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info',description: 'Информация о боте'},
        {command: '/slava_ukraine', description: 'Не надо нажимать'},
        {command: '/game',description: 'отгадай от 1 до 9'}
    ])

    bot.on('message',async msg=>{
        const text = msg.text;
        const chatId =msg.chat.id;
        const name = msg.chat.first_name;
        if (text === '/start'){
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp');
            return bot.sendMessage(chatId,`Привет, ${name}! Добро пожаловать в бот 2К!`);
        }
        if(text==='/info'){
            return bot.sendMessage(chatId,'Ну тут пока ничего нет, но скоро все будет, отвечаю');
        }
        if(text === '/slava_ukraine'){
            await bot.sendSticker(chatId,'https://cdn.tlgrm.app/stickers/43e/041/43e041ad-afbb-34c9-8e62-222f29474c0e/256/1.webp');
            return bot.sendMessage(chatId,'Z Z Z Z Z Героям сала Z Z Z Z Z');
        }
        if(text === '/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId,'Я тебя не понимаю брат, попробуй еще раз ежжи');

    });
    bot.on('callback_query',msg=>{
        const data =msg.data;
        const chatId=msg.message.chat.id;
        if(data==='/again'){
            return startGame(chatId);
        }
        if(data===chats[chatId]){
            return bot.sendMessage(chatId,`ты угадал ${chats[chatId]}`,againOptions);
        }else{
            return bot.sendMessage(chatId,`ты не угадал, я загадал цифру ${chats[chatId]}`,againOptions);
        }
    })
}
start()