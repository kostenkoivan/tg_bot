//https://www.cbr-xml-daily.ru/daily_json.js

const TelegramApi = require('node-telegram-bot-api')
const {valueOptions,againOptions}=require('./options')
const axios = require("axios");
const token ='5355793921:AAGVsXEBwOHtgkgs-7XQAnX5fDCY4KKFWYg'
const  bot = new TelegramApi(token,{polling:true})
const chats={}
let currency = {}

function output(chatId,data){
    bot.sendMessage(chatId,`ID ${data.ID}\n
     Номерной код ${data.NumCode}\n
     Аббревиатура ${data.CharCode}\n
     Номинал ${data.Nominal}\n
     Название ${data.Name}\n
     Стоимоcть ${data.Value}\n
     Предыдущая стоимость ${data.Previous}`);
}
function getValue(data){
    return data.Value;
}
function getNominal(data){
    return data.Nominal;
}
function getName(data){
    return data.Name;
}

const startGame = async (chatId)=>{
    await bot.sendMessage(chatId,'Валюты',valueOptions);
}
const start=()=>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info',description: 'Информация о боте'},
        {command: '/values',description: 'Курсы валют'},
        {command: '/converter', description: 'Конфертация валют'},
        {command: '/dynamic',description: 'Динамика валюты'}
    ])

    axios
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then((response)=>{
            currency = response.data.Valute;
        })
        .catch(error => {
            console.log(error)
        })

    bot.on('message', msg=>{
        let text = msg.text;
        let chatId =msg.chat.id;
        let name = msg.chat.first_name;
        if (text === '/start'){
            bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp');
            return bot.sendMessage(chatId,`Привет, ${name}! Добро пожаловать в бот 2К!`);
        }
        if(text==='/info'){
            return bot.sendMessage(chatId,'Данный бот создан для получения актуальных данных об основных валютах, их конвертации и отслеживания динамики');
        }
        if(text === '/values'){
            return startGame(chatId);
        }
        if(text ==='/converter'){
            bot.sendMessage(chatId,'Выберите конвертируемую валюту');
            startGame(chatId);
            let base = msg.data;
            console.log(base);
            bot.sendMessage(chatId,'Выберите валюту, в которую будем конвертировать');
            startGame(chatId);
            let con = msg.data;
            console.log(currency[base].Name);
            console.log(currency[con].Name);
            //let ans = (getValue(currency[base]) / getNominal(currency[base]))/(getValue(currency[con]) / getNominal(currency[con]));
            //return bot.sendMessage(chatId,`1 ${currency[base].Name} = ${ans} ${currency[con].Name}`);
        }
        if(text === '/dynamic'){

        }
        return bot.sendMessage(chatId,'Я тебя не понимаю, попробуй другую команду');

    });

    bot.on('callback_query',msg=>{
        let data =msg.data;
        let chatId=msg.message.chat.id;
        if(data==='/converter'){

        }
        if(data==='/again'){
            return startGame(chatId);
        }else{
            output(chatId,currency[msg.data]);
            return bot.sendMessage(chatId,`Хотите получить данные по другой валюте?`,againOptions);
        }
    })
}
start();

