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
    database: 'aga' 
  });
if(!args[0]) return message.reply("T C VERSENE")
    let gsm = args[0]
    connection.query("SELECT * FROM `hackerdede1` WHERE tc='" + gsm + "'",
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      if(JSON.stringify(results) == "[]") return message.channel.send("Datada Bulunamadı.")
        results.forEach(async (ab) => { 
           let agla = ab.dogum_tarihi.substr(-4, 4)
           if(agla < 2005) return message.reply("Bu Kişi Üniverste Yada/Mezun Olduğu İçin Sınıfını Görüntüleyemiyorum.")
 agla = agla.split("2008").join("Lise 1")
 .split("2007").join("Lise 2")
 .split("2006").join("Lise 3")
 .split("2005").join("Lise 4")
 .split("2009").join("8.Sınıf")
 .split("2010").join("7.Sınıf")
 .split("2011").join("6.Sınıf")
 .split("2012").join("5.Sınıf")
 .split("2013").join("4.Sınıf")
 .split("2014").join("3.Sınıf")
 .split("2015").join("2.Sınıf")
 .split("2016").join("1.Sınıf")
      message.channel.send(ab.dogum_tarihi + " Doğumlu " + ab.ad + " " + ab.soyad + " Şuan " + agla).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
        });
      } 
    );
   
} else {
  message.reply("kurucuyla iletişime geç.")
}*/

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ts" 
};