const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
  message.reply('Yapim asamasinda')
/*let a = await db.get(`pre_${message.author.id}`)
if(!a) return message.reply("Premium Üyeliğin Yok!")
if(a.durum == "true") {
  if(!args[1]) return message.reply("İSİM SOYİSİM?")
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'eski'
  });
  if(args[2]) {
    let ad = args[0] + " " + args[1]
    let soyad = args[2]
    if (fs.existsSync(ad + ' ' + soyad + '.txt')) {
      let dosya = ad + ' ' + soyad + '.txt'
     message.channel.send({
       files: [dosya],
       content: `al`
  }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
  })
    } else {
    connection.query("SELECT * FROM `eski` WHERE AD='" + ad + "' AND SOYAD='" + soyad + "'",
    function(err, results, fields) {
      console.log(results);
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadı.")
        results.forEach(async (ab) => { 
          fs.appendFile(ad + ' ' + soyad + '.txt', `
          ${ab.AD} ${ab.SOYAD} - ${ab.TC} - ${ab.DOĞUMTARİHİ} - ${ab.ANAADI} ${ab.BABAADI} -${ab.ADRESŞEHİR} ${ab.ADRESİLÇE} ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBİNA}`, function (err, data) {
            if (err) throw err;
          });
         });
         let dosya = ad + ' ' + soyad + '.txt'
         message.channel.send({
           files: [dosya],
           content: `al`
      }).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
      setTimeout(() => {
      fs.unlink(dosya, function (err) {
        if (err) throw err;
        console.log('Dosya başarıyla silindi.');
      });
    }, 10000)
      }
    );
  } }
  if(!args[2]) {
    let ad = args[0]
    let soyad = args[1]
    if (fs.existsSync(ad + ' ' + soyad + '.txt')) {
      let dosya = ad + ' ' + soyad + '.txt'
     message.channel.send({
       files: [dosya],
       content: `**BU İSİM SOYİSMİ KULLANAN +18LERİN Bİ LİSTESİ**`
  }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
  })
    } else { 
      connection.query( 
    "SELECT * FROM `eski` WHERE AD='" + ad + "' AND SOYAD='" + soyad + "'",
    function(err, results, fields) {
      console.log(results);
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadı.")
        results.forEach(async (ab) => { 
          fs.appendFile(ad + ' ' + soyad + '.txt', `
          ${ab.AD} ${ab.SOYAD} - ${ab.TC} - ${ab.DOĞUMTARİHİ} - ${ab.ANAADI} ${ab.BABAADI} -${ab.ADRESŞEHİR} ${ab.ADRESİLÇE} ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBİNA}`, function (err, data) {
            if (err) throw err;
          });
         }); 
         let dosya = ad + ' ' + soyad + '.txt'
         message.channel.send({
           files: [dosya],
           content: `**BU İSİM SOYİSMİ KULLANAN +18LERİN Bİ LİSTESİ**`
      }).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
      setTimeout(() => {
        fs.unlink(dosya, function (err) {
          if (err) throw err;
          console.log('Dosya başarıyla silindi.'); 
        });
      }, 10000)
      }
  );
    }
}
} else {
  message.reply("kurucuyla iletişime geç.")
}*/



};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "mrns"
};