module.exports = {
     valueOptions:{
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'Австралийский доллар',callback_data: 'AUD'}],
                [{text: 'Азербайджанский манат',callback_data: 'AZN'}],
                [{text: 'Фунт стерлингов Соединенного королевства',callback_data: 'GBP'}],
                [{text: 'Армянских драмов',callback_data: 'AMD'}],
                [{text: 'Белорусский рубль',callback_data: 'BYN'}],
                [{text: 'Болгарский лев',callback_data: 'BGN'}],
                [{text: 'Бразильский реал',callback_data: 'BRL'}],
                [{text: 'Венгерских форинтов',callback_data: 'HUF'}],
                [{text: 'Гонконгских долларов',callback_data: 'HKD'}],
                [{text: 'Датских крон',callback_data: 'DKK'}],
                [{text: 'Доллар США',callback_data: 'USD'}],
                [{text: 'Евро',callback_data: 'EUR'}],
                [{text: 'Индийских рупий',callback_data: 'INR'}],
                [{text: 'Казахстанских тенге',callback_data: 'KZT'}],
                [{text: 'Канадский доллар',callback_data: 'CAD'}],
                [{text: 'Киргизских сомов',callback_data: 'KGS'}],
                [{text: 'Китайских юаней',callback_data: 'CNY'}],
                [{text: 'Молдавских леев',callback_data: 'MDL'}],
                [{text: 'Норвежских крон',callback_data: 'NOK'}],
                [{text: 'Польский злотый',callback_data: 'PLN'}],
                [{text: 'Румынский лей',callback_data: 'RON'}],
                [{text: 'СДР (специальные права заимствования)',callback_data: 'XDR'}],
                [{text: 'Сингапурский доллар',callback_data: 'SGD'}],
                [{text: 'Таджикских сомони',callback_data: 'TJS'}],
                [{text: 'Турецких лир',callback_data: 'TRY'}],
                [{text: 'Новый туркменский манат',callback_data: 'TMT'}],
                [{text: 'Узбекских сумов',callback_data: 'UZS'}],
                [{text: 'Украинских гривен',callback_data: 'UAH'}],
                [{text: 'Чешских крон',callback_data: 'CZK'}],
                [{text: 'Шведских крон',callback_data: 'SEK'}],
                [{text: 'Швейцарский франк',callback_data: 'CHF'}],
                [{text: 'Южноафриканских рэндов',callback_data: 'ZAR'}],
                [{text: 'Вон Республики Корея',callback_data: 'KRW'}],
                [{text: 'Японских иен',callback_data: 'JPY'}],
            ]
        })
    },
    againOptions:{
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'Выбор другой валюты',callback_data: '/again'}],
            ]
        })
    }

}