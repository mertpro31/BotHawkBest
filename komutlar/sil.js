const Discord = require("discord.js");
const mysql = require("mysql2");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
exports.run = async (client, message, args) => {
let a = message.author.id
if(a == "1044608876487651329" || a == "962724469586149386") {
  if(!args[0]) return message.reply("la id")
message.reply("<@" + args[0] + "> Premium Silindi")
db.delete(`pre_${args[0]}`)
} else {
    message.reply("sen kim oluynki")
}
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "sil"
};