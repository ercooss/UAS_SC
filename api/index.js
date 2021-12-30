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
     model.predict(
[
    parseFloat(s[0]), // string to float
    parseFloat(s[1])
]
   
).then((jres1)=>{
console.log(jres1);
         
    model.predict([parseFloat(s[0]), parseFloat(s[1]), parseFloat(jres1[0]), parseFloat (jres1[1])]).then((jres2) => {
    bot.sendMessage(
         msg.chat.id,
         `nilai yang diprediksi adalah ${jres1[0]} x`

);
    bot.sendMessage(
         msg.chat.id,
           `nilai x yang diprediksi adalah ${jres1[1]} y`
);
    bot.sendMessage(
          msg.chat.id,
            `prediksi ${jres2}`
            );
        state = 0;
        })
   })
}else{
    bot.sendMessage(
         msg.chat.id,
         `Please Click /start`
    );
state = 0;
    }
})
// routers
r.get('/predict/:x1/:y1', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.y1)
        ] 
    ).then((jres)=>{
        model.predict(
            [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.y1),
            parseFloat(jres[0]), 
            parseFloat(jres[1])
            ]
      ).then((jres_)=>{
         res.json({jres,jres_})  
            })
        })
});
module.exports = r;
