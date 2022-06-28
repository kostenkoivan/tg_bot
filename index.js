//https://www.cbr-xml-daily.ru/daily_json.js

//"шапка" программы, загрузка необходимых для работы библиотек, занесение токена бота, описание глобальных переменных
const TelegramApi = require('node-telegram-bot-api')
const {valueOptions,againOptions,firstCurrency,secondCurrency, dynamicCurrency}=require('./options')
const axios = require("axios");
const token ='5355793921:AAGVsXEBwOHtgkgs-7XQAnX5fDCY4KKFWYg'
const  bot = new TelegramApi(token,{polling:true})
let currency = {}


//функция вывода переменной-валюты
function output(chatId,data){
    bot.sendMessage(chatId,`ID ${data.ID}\n
     Номерной код ${data.NumCode}\n
     Аббревиатура ${data.CharCode}\n
     Номинал ${data.Nominal}\n
     Название ${data.Name}\n
     Стоимоcть ${data.Value}\n
     Предыдущая стоимость ${data.Previous}`);
}
function output_dynamic(chatId,data){
    if(getValue(data) - getPrevious(data) < 0) {
        return bot.sendMessage(chatId,`Динамика валюты ${data.Name} отрицательная: ${(data.Value - data.Previous).toPrecision(4)}`) ;
    }
    else{
        return bot.sendMessage(chatId,`Динамика валюты ${data.Name} положительная: +${(data.Value - data.Previous).toPrecision(4)}`) ;
    }
}
function output_converted(chatId,firstData,secondData){

    let ans = (firstData.Value / firstData.Nominal)/(secondData.Value/ secondData.Nominal);

    return bot.sendMessage(chatId,`1 ${firstData.Name} = ${ans} ${secondData.Name}`)
}
//описание геттеров
function getCode(data){
    return data.NumCode;
}
function getCharCode(data){
    return data.CharCode;
}
function getNominal(data){
    return data.Nominal;
}
function getName(data){
    return data.Name;
}
function getValue(data){
    return data.Value;
}
function getPrevious(data){
    return data.Previous;
}
const getValueInfo = async (chatId)=>{
    await bot.sendMessage(chatId,'Валюты',valueOptions);
}
const converter = async (chatId)=>{
    await bot.sendMessage(chatId,'Конвертируемая валюта',firstCurrency);
}
const dynamic = async (chatId)=>{
    await bot.sendMessage(chatId,'Валюты',dynamicCurrency);
}
//тело программы
const start=()=>{
    //меню, в котором содержаться все команды бота
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info',description: 'Информация о боте'},
        {command: '/values',description: 'Курсы валют'},
        {command: '/converter', description: 'Конвертация валют'},
        {command: '/dynamic',description: 'Динамика валюты'}
    ])
    //получение данных о валюте с официального сайта ЦБ РФ
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
            return getValueInfo(chatId);
        }
        if(text ==='/converter'){
            converter(chatId);
        }
        if(text === '/dynamic'){
            return dynamic(chatId);
        }
    });
    //очередь коллбеков
    let first_c;
    bot.on('callback_query',msg=>{
        let data = msg.data;
        let chatId=msg.message.chat.id;
        if(data[3]==='d'){
            let basa = data.slice(0,-1);
            return output_dynamic(chatId,currency[basa]);
        }
        if(data[3]==='f'){
            let basa =data.slice(0,-1);
            first_c = basa;
            return bot.sendMessage(chatId,'Валюта, в которую конвертируем', secondCurrency)
        }
        if(data[3]==='s'){
            let basa =data.slice(0,-1);
            return output_converted(chatId,currency[first_c],currency[basa]);
        }else{
            if(data==='/again'){
                return getValueInfo(chatId);
            }else{
                output(chatId,currency[msg.data]);
                return bot.sendMessage(chatId,`Хотите получить данные по другой валюте?`,againOptions);
            }
        }
    })
}
start();

