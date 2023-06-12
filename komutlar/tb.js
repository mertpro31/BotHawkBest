const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
  message.reply('Yapim asamasinda')
/*let a = await db.get(`pre_${message.author.id}`)
console.log(a)
if(!a) return message.reply("Premium Üyeliğin Yok!")
if(a.durum == "true") {
    if(!args[0]) return message.reply("TC?")
    const connection = mysql.createConnection({
        host: 'localhost', 
        user: 'root', 
        database: 'eski' 
      });
      const connection2 = mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'aga' 
      });
if(!args[0]) return message.reply("T C VERSENE")
    let gsm = args[0]

    connection.query("SELECT * FROM `eski` WHERE TC='" + gsm + "'",
    function(err, results, fields) {
      console.log(results); 
      if(JSON.stringify(results) == "[]") {
        connection2.query("SELECT * FROM `hackerdede1` WHERE tc='" + gsm + "'",
        function(err, results, fields) {
          console.log(results); 
          if(JSON.stringify(results) == "[]") return message.channel.send("Datada bulunamadı")
            results.forEach(async (ab) => { 
          message.channel.send(ab.tc + " " + ab.ad + " " + ab.soyad + " - " + ab.dogum_tarihi).then(msg => {
            setTimeout(() => msg.delete(), 9000)
          })
            });
          })
        } else {
        results.forEach(async (ab) => { 
      message.channel.send(`${ab.AD} ${ab.SOYAD} - ${ab.TC} - ${ab.DOĞUMTARİHİ} - ${ab.ANAADI} ${ab.BABAADI} -${ab.ADRESŞEHİR} ${ab.ADRESİLÇE} ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBİNA}`).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
        });
      }
    })
  
} else {
  message.reply("kurucuyla iletişime geç.")
}*/

}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "tb" 
};