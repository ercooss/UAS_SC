var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('api/sdk/model.js'); //predict 


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5057562264:AAFGt5Vl2GKeNXbR7BW2QpQ29uE1HVfmpUA'
const bot = new TelegramBot(token, {polling: true});

state=0;
// main menu bot
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );  
    state=0;
});

// input I dan r
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai x1|y1 contoh 9|9`
    );   
    state =1;
});

bot.on('message',(msg) =>{
    if(state == 1){
    s= msg.text.split("|");
    x1 = s[0]
    y1 = s[1]
     model.predict(
[
    parseFloat(s[0]), // string to float
    parseFloat(s[1])
]
).then((jres)=>{
    bot.sendMessage(
         msg.chat.id,
         `nilai x yang diprediksi adalah ${jres[0]} x`
            );
    bot.sendMessage(
         msg.chat.id,
          `nilai y yang diprediksi adalah ${jres[1]} y`
            );
   })
}else{
state = 0;
    }
});
module.exports = r;
