const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
let a = await db.get(`pre_${message.author.id}`)
if(!a) return message.reply("Premium Üyeliğin Yok!")
if(a.durum == "true") {
  if(!args[0]) return message.reply("TC NO?")
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '101m'
  });
  if(args[0]) {
    let tc = args[0]
    if (fs.existsSync(tc + '.txt')) {
      let dosya = tc + '.txt'
     message.channel.send({
       files: [dosya],
       content: `9 Saniyede Silinecektir.`
  }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
  })
    } else {
    connection.query("SELECT * FROM `101m` WHERE TC='" + tc + "'",
    function(err, results, fields) {
      console.log(results);
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadı.") //- ${ab.DOĞUMTARİHİ} - ${ab.ANAADI} ${ab.BABAADI} -${ab.ADRESŞEHİR} ${ab.ADRESİLÇE} ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBİNA}
        results.forEach(async (ab) => { 
          fs.appendFile(tc + '.txt', `
          ${ab.ADI} ${ab.SOYADI} - ${ab.TC} - ${ab.DOGUMTARIHI} - ${ab.ANNEADI} ${ab.ANNETC} ${ab.BABAADI} ${ab.BABATC} -${ab.NUFUSIL} ${ab.NUFUSILCE}`, function (err, data) {
            if (err) throw err;
          });
         });
         let dosya = tc + '.txt'
         message.channel.send({
           files: [dosya],
           content: `9 Saniyede Silinecektir.`
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
} else {
  message.reply("kurucuyla iletişime geç.")
}

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "tc"
};