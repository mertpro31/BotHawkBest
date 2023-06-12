const { delByPriority } = require("croxydb");
const { QuickDB } = require("quick.db");
const fetch = require("node-fetch")
const db = new QuickDB();
const mysql = require("mysql2") 
const client = require("../index");
function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }
  
    return false;
  }

client.on("ready", async () => {  
    
  /*  const connection = mysql.createConnection({
        host: '20.106.160.165',
        user: 'root',
        database: 'tel'
      });

      connection.query("SELECT * FROM `illegalplatform_hackerdede1_gsm` WHERE GSM='5366081891'",
      function(err, results, fields) {
        console.log(results); 
          })
    
  
*/
    console.log(`${client.user.tag} Ýsmi Ýle Bot Aktif!`)
    client.user.setActivity(`Made By HzPunchmax`)
    client.user.setStatus(`do not bother`)
    setInterval(() => {
        client.channels.cache.get("1055131588863737958").send("@everyone kayýt olmak için ```.``` býrakýn")
            },6000000)

        setInterval(async () => {
            let a = await db.get("pr")
            a.forEach(async (ab, index) => {
            let e = ab.sure - Date.now()
    const days = Math.floor(e / (24*60*60*1000));
    const daysms = e % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = e % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = e % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    let h =  days + " Gün " + hours + " Saat " + minutes + " Dakika " + sec + " Saniye";

            if(isNegative(ab.sure - Date.now())) {
                let hh = await db.get("pre_" + ab.isim)
                if(!hh) return;
                if(hh.sure == ab.sure) {
                    let metin = {"sure":ab.sure,"isim":ab.isim}
                    console.log(metin)
                    await db.delete(`pre_${ab.isim}`)
                    await db.pull("pr", metin)
                } else {}
            } 
            })
        },1000)

});
 