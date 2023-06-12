const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
let a = await db.get(`pre_${message.author.id}`)
console.log(a)
if(!a) return message.reply("Premium Üyeliğin Yok!")
if(a.durum == "true") {
    if(!args[0]) return message.reply("TC?")
  const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'javelin_gsm' 
  });
if(!args[0]) return message.reply("T C VERSENE")
    let gsm = args[0]
    connection.query("SELECT * FROM `illegalplatform_hackerdede1_gsm` WHERE TC='" + gsm + "'",
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      if(JSON.stringify(results) == "[]") return message.channel.send("Datada Bulunamadı.")
        results.forEach(async (ab) => { 
            message.channel.send(ab.TC + " = " + ab.GSM + " - made by !HzPunchmax")
        });
      }
    );
} else {
  message.reply("kurucuyla iletişime geç.")
}
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "tg" 
};