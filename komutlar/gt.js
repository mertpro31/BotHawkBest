const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
let a = await db.get(`pre_${message.author.id}`)
if(!a) return message.reply("Premium Üyeliğin Yok!")
if(a.durum == "true") {
    if(!args[0]) return message.reply("Tel?")
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'javelin_gsm'
  });
if(!args[0]) return message.reply("TEL VERSENE")
    let qwegsm = args[0]
    connection.query("SELECT * FROM `illegalplatform_hackerdede1_gsm` WHERE GSM='" + qwegsm + "'",
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadı.")
        results.forEach(async (ab) => { 
      message.channel.send(ab.GSM + " = " + ab.TC).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
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
  name: "gt"
};