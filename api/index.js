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
        `hello ${msg.chat.first_name}, selamat datang di bot prediksi x dan y...\n
        click /predict`
    );  
    state=0;
});

// input I dan r
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai X1|X2|X3 contoh 9|9|2`
    );   
    state =1;
});

bot.on('message',(msg) =>{
    if(state == 1){
    s= msg.text.split("|");
     model.predict(
[
    parseFloat(s[0]), // string to float
    parseFloat(s[1])
    parseFloat(s[2])
])
}});

// routers
r.get('/predict/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.x2),
            parseFloat(req.params.x3)
        ]
    )
});

module.exports = r;
