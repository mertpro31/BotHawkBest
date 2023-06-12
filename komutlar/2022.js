const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
let a = await db.get(`pre_${message.author.id}`)
if(!a) return message.reply("Premium Üyeliðin Yok!")
if(a.durum == "true") {
  if(!args[1]) return message.reply("ÝSÝM SOYÝSÝM?")
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '101m'
  });
  if(args[2]) {
    let ad = args[0] + " " + args[1]
    let soyad = args[2]
   /* let il = args[3]
    let ilce = args[4]*/
    if (fs.existsSync(ad + soyad + '.txt')) {
      let dosya = ad + soyad + '.txt'
     message.channel.send({
       files: [dosya],
       content: `9 Saniyede Silinecektir.`
  }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
  })
    } else {
    connection.query("SELECT * FROM `101m` WHERE ADI='" + ad + "' AND SOYADI='" + soyad + "'", //AND NUFUSIL='" + il + "' AND NUFUSILCE='" + ilce + "'
    function(err, results, fields) {
      console.log(results);
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadý.") //- ${ab.DOÐUMTARÝHÝ} - ${ab.ANAADI} ${ab.BABAADI} -${ab.ADRESÞEHÝR} ${ab.ADRESÝLÇE} ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBÝNA}
        results.forEach(async (ab) => { 
          fs.appendFile(ad + soyad + '.txt', `
          ${ab.ADI} ${ab.SOYADI} - ${ab.TC} - ${ab.DOGUMTARIHI} - ${ab.ANNEADI} ${ab.BABAADI} -${ab.NUFUSIL} ${ab.NUFUSILCE}`, function (err, data) {
            if (err) throw err;
          });
         });
         let dosya = ad + ' ' + soyad + '.txt'
         message.channel.send({
           files: [dosya],
           content: `9 Saniyede Silinecektir.`
      }).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
      setTimeout(() => {
      fs.unlink(dosya, function (err) {
        if (err) throw err;
        console.log('Dosya baþarýyla silindi.');
      });
    }, 10000)
      }
    );
  } }
  if(!args[2]) {
    let ad = args[0]
    let soyad = args[1]
    /*let il = args[2]
    let ilce = args[3]*/
    if (fs.existsSync(ad + '101m' + soyad + '.txt')) {
      let dosya = ad + soyad + '.txt'
     message.channel.send({
       files: [dosya],
       content: `**BU ÝSÝM SOYÝSMÝ KULLANAN +18 VE -18LERÝN BÝ LÝSTESÝ**`
  }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
  })
    } else { 
      connection.query( 
    "SELECT * FROM `101m` WHERE ADI='" + ad + "' AND SOYADI='" + soyad + "'", //AND NUFUSIL='" + il + "' AND NUFUSILCE='" + ilce + "'
    function(err, results, fields) {
      console.log(results);
      if(JSON.stringify(results) == "[]") return message.reply("Datada Bulunamadý.") // ${ab.ADRESMAHALLE} ${ab.ADRESSOKAK} ${ab.ADRESBÝNA} }).then(msg => {
        results.forEach(async (ab) => { 
          fs.appendFile(ad + '101m' + soyad + '.txt', `
          ${ab.ADI} ${ab.SOYADI} - ${ab.TC} - ${ab.DOGUMTARIHI} - ${ab.ANNEADI} ${ab.BABAADI} -${ab.NUFUSIL} ${ab.NUFUSILCE}`, function (err, data) {
            if (err) throw err;
          });
         }); 
         let dosya = ad + '101m' + soyad + '.txt'
         message.channel.send({
           files: [dosya],
           content: `**BU ÝSÝM SOYÝSMÝ KULLANAN +18 VE -18LERÝN BÝ LÝSTESÝ**`
      }).then(msg => {
        setTimeout(() => msg.delete(), 9000)
      })
      setTimeout(() => {
        fs.unlink(dosya, function (err) {
          if (err) throw err;
          console.log('Dosya baþarýyla silindi.'); 
        });
      }, 10000)
      }
  );
    }
}

} else {
  message.reply("kurucuyla iletiþime geç.")
}

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "as"
};