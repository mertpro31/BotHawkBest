const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
exports.run = async (client, message, args) => {
let a = message.author.id
if(a == "1076180563452510340" || a == "1076180563452510340") {
  if(!args[0]) return message.reply("la id")
  if(!args[1]) return message.reply("la süre")
message.reply("<@" + args[0] + "> Premium Verildi")
let ss = args[1] * 86400000
let gg = Date.now() + ss
let dd = args[0]
db.set(`pre_${args[0]}`, {durum: "true", sure: Date.now() + ss})
db.push("pr", {"sure":gg,"isim":dd})
} else {
    message.reply("sen kim oluynki")
}
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ekle"
};