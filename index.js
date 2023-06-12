const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
const link = config.link;
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Strategy } = require("passport-discord");
const app = express();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const mysql = require("mysql2")
const bodyParser = require("body-parser")
app.use(express.static("public"));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(express.static("public"));

//--------------------------------------------------------------------------//
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if (new Date().getTime() - start > milliseconds) {
		break;
	  }
	}
  }

const strategy = new Strategy(
	{
		clientID: "1072122731161726976",
		clientSecret: "DFGQ86lpPoTnTwOm0Mm63nr6eHZgqQ3_",
		callbackURL: link + `callback`,
		scope: ["identify"],
	},
	(_access_token, _refresh_token, user, done) =>
		process.nextTick(() => done(null, user)),
);

passport.use(strategy);

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(passport.session());
app.use(passport.initialize());
//--------------------------------------------------------------------------------//
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.login(token); 


//-----------------------------------------------------------------------------------//

app.get("/bakim", (req, res) => {
	res.render("bakimd")
	
});

app.get("/giris", passport.authenticate("discord", {scope: ["identify"],}));

app.get("/callback", passport.authenticate("discord", {failureRedirect: "/hata",}),(req, res) => {

	res.redirect("/pre")
 
});

app.get("/cikis", function (req, res) {
	
	  req.session.destroy(() => {
		req.logout();
		res.redirect("/");
	  });
  });

  app.post("/reboot", urlencodedParser, function (req, res) {
	  res.send("Sistem Rebootlandı");
	  process.exit(0);
  });

app.use(async function(req, res, next) {
	//console.log(`${req.method} ${req.url}`);
	if(req.user) user = req.user.id;
if(!req.user) user = "213"
	let durum = await db.get("site_durumu")
	if(durum == "Kapalı" && user !== "962724469586149386") return res.redirect("/bakim")
  next()
});

app.get("/", async function (req, res) {
	const user = req.user ? req.user : null
  if(user) return res.redirect("/pre")
  let length = await db.get("pr")
	res.render("index", { client:client,db:db, length:length}) 
});

app.get("/sorgu/:id", async function (req, res) {
  if(!req.user) return res.redirect("/giris")
  let dogru = await db.get("pre_" + req.user.id)
  if(!dogru) return res.send("premium üyeliğin yok!")
  const id = req.params.id;
  if(id == "gt"||"mrns"||"sorgu"||"tb"||"tg") {
res.render(id, { user:req.user,
	db:db, client:client,link:link })
  } else { 
    res.send("geçersiz sorgu türü")
  }
});

app.get("/sorguu/sinifozel", async function (req, res) {
  res.render("sinifozel", { user:req.user,
    db:db, client:client,link:link })
  });
  app.get("/saldiri/sms", async function (req, res) {
    res.render("sms")
    });

app.get("/pre", async function (req, res) {
  if(!req.user) return res.redirect("/giris")
  let dogru = await db.get("pre_" + req.user.id)
  if(!dogru) return res.send("premium üyeliğin yok!")
  if(dogru.durum == "true") {
	res.render("pre", { user:req.user,
	db:db, client:client }) 
  } else {
    res.send("kurucuyla iletişime geç")
  }
});


app.get("/profil", async function (req, res) {
  if(!req.user) return res.redirect("/giris")
  let dogru = await db.get("pre_" + req.user.id)
  if(!dogru) return res.send("premium üyeliğin yok!")
  if(dogru.durum == "true") {
	res.render("profil", { user:req.user,
	db:db, client:client, haha:dogru,link:link}) 
  } else {
    res.send("kurucuyla iletişime geç")
  }
});
 
app.get("/administan", (req, res) => {
if(!req.user) return res.redirect("/giris")
	if(req.user.id !== "962724469586149386") return res.send("Yetkisiz Giriş")
	res.render("panel", {db:db})
});

app.post("/bakim-ayarla", urlencodedParser, function (req, res) {
	let f = req.body.durum;
	console.log(f);


	db.delete("site_durumu");
	sleep(1000);
	db.set("site_durumu", f);
	res.send("Bot artık " + f + " Modunda.");
	sleep(4000)
	process.exit(0);
  });

const listener = app.listen("3000", () => {
	console.log("Proje Şu Portla Başlatıldı " + listener.address().port);
  });

  app.post("/sorgu", urlencodedParser, function (req, res) {
    if(!req.user) return res.send("bi sen akıllısın hacker ab")
    let a = req.body.ad;
    let s = req.body.soyad;
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: '101m'
    }); 
    connection.query("SELECT * FROM `101m` WHERE ADI='" + a + "' AND SOYADI='" + s + "'",
    function(err, results, fields) {
      if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
      let str = JSON.stringify(results)
 res.render("sonuc", {sonuc:results})
 connection.end()
        })
      })

//------------------------------------------------------------------------
app.post("/gt", urlencodedParser, function (req, res) {
  if(!req.user) return res.send("bi sen akıllısın hacker ab")
  let s = req.body.tel;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tel'
  });
  connection.query("SELECT * FROM `tel` WHERE TEL=' " + s + "'",
  function(err, results, fields) {
    if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
    let str = JSON.stringify(results)
res.render("sonuc", {sonuc:results})
connection.end()
      })
    })

//------------------------------------------------------------------------
app.post("/tg", urlencodedParser, function (req, res) {
  if(!req.user) return res.send("bi sen akıllısın hacker ab")
  let s = req.body.tel;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tel'
  });
  connection.query("SELECT * FROM `tel` WHERE TC='" + s + "'",
  function(err, results, fields) {
    if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
    let str = JSON.stringify(results)
res.render("sonuc", {sonuc:results})
connection.end()
      })
    })
//------------------------------------------------------------------------
app.post("/mrns", urlencodedParser, function (req, res) {
  if(!req.user) return res.send("bi sen akıllısın hacker ab")
  let a = req.body.ad;
  let s = req.body.soyad;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'eski'
  });
  connection.query("SELECT * FROM `eski` WHERE ad='" + a + "' AND soyad='" + s + "'",
  function(err, results, fields) {
    if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
    let str = JSON.stringify(results)
res.render("sonuc", {sonuc:results})
connection.end()
      })
    })

//------------------------------------------------------------------------
app.post("/tb", urlencodedParser, function (req, res) {
  if(!req.user) return res.send("bi sen akıllısın hacker ab")
  let a = req.body.tc;
    const connection = mysql.createConnection({
        host: 'localhost', 
        user: 'root', 
        database: '101m' 
      });
    connection.query("SELECT * FROM `101m` WHERE TC='" + a + "'",
    function(err, results, fields) {
          if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
          res.render("sonuc", {sonuc:results})
          connection.end()
    })
    })

    app.post("/ta", urlencodedParser, function (req, res) {
      let a = req.body.tc;
        const connection = mysql.createConnection({
            host: 'localhost', 
            user: 'root', 
            database: '101m' 
          });
        connection.query("SELECT * FROM `101m` WHERE TC='" + a + "'",
        function(err, results, fields) {
              if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
              var ana;
              var baba;
              var cocuk = results
              var cocuktc;
              results.forEach(async (ab) => { 
                ana = ab.ANNETC
                baba = ab.BABATC
                cocuktc = ab.TC
              })
var babab = ""
var anab = ""
var kardes = ""
var cocuklar = ""
var cocuklars = ""
 connection.query("SELECT * FROM `101m` WHERE TC='" + baba + "'",
async function(err, results, fields) {
  results.forEach(async (ab) => { 
    babab = results
  })
  connection.query("SELECT * FROM `101m` WHERE TC='" + ana + "'",
  function(err, results, fields) {
    results.forEach(async (ab) => { 
      anab = results
    })
    connection.query("SELECT * FROM `101m` WHERE BABATC='" + baba + "'",
    function(err, results, fields) {
      if(JSON.stringify(results) == "[]") {
        kardes = ""
      } else {
      results.forEach(async (ab) => { 
        kardes = results
      })
      }
      connection.query("SELECT * FROM `101m` WHERE BABATC='" + cocuktc + "'",
      function(err, results, fields) {
        if(JSON.stringify(results) == "[]") {
         cocuklar = ""
        } else {
        results.forEach(async (ab) => { 
          cocuklar = results
        })
        }
        connection.query("SELECT * FROM `101m` WHERE ANNETC='" + cocuktc + "'",
        function(err, results, fields) {
          if(JSON.stringify(results) == "[]") {
            cocuklars = ""
          } else {
          results.forEach(async (ab) => { 
            cocuklars = results
          })
          }
          let zua = []
          let za = zua.concat(babab, anab, kardes, cocuklars, cocuklar)
      res.render("sonuc", {sonuc:za})
      })
    })
  })
})
})
      })
        })

    
//------------------------------------------------------------------------

app.get("/api/sorgu/:tc/:key", (request, response) => {
const tc = req.params.tc
const key = req.params.key
if(key == "yusuf") {
  const connection2 = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: '101m' 
  });
  connection2.query("SELECT * FROM `aile` WHERE tc='" + tc + "'",
  function(err, results, fields) {
    if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
    res.send(results)
    })
} else {
  res.send("yetkisiz giriş")
}
});


//****************************************************** */
app.post("/sinifozel", urlencodedParser, function (req, res) {
  let a = req.body.ad;
  let s = req.body.soyad;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '101m'
  }); 
  console.log(" ++++++++++++++++++++++++++++ "+  a+ "  " + s + " ++++++++++++++++++++++++ ")
  if(s == "GÖÇER") return res.send("kaşınma")
  if(s == "göçer") return res.send("kaşınma")
  if(s == "Göçer") return res.send("kaşınma")
  
  connection.query("SELECT * FROM `101m` WHERE ADI='" + a + "' AND SOYADI='" + s + "'",
  function(err, results, fields) {
    if(JSON.stringify(results) == "[]") return res.send("Datada Bulunamadı")
    let str = JSON.stringify(results)
res.render("sonuc", {sonuc:results})
      })
    })

//------------------------------------------------------------------------------//