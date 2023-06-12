const Discord = require("discord.js");
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const mysql = require("mysql2");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = async (client, message, args) => {
  let hhh = await db.get(`pre_${message.author.id}`)
  if(!hhh) return message.reply("Premiumun yok")
	let a = hhh.durum
    let ab = hhh.sure
    if(!a) d = "Aktif Değil" 
    if(a == "true") d = "Aktif"
    if(a == "false") d = "Aktif Değil"

    if(!ab) e = "0"
    if(ab) e = ab - Date.now()
    const days = Math.floor(e / (24*60*60*1000));
    const daysms = e % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = e % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = e % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    let h =  days + " Gün " + hours + " Saat " + minutes + " Dakika " + sec + " Saniye";
    console.log(h)
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor(0x0099FF)
	.setTitle('Bilgi Menüsü')
	.addFields(
		{ name: 'Premium Durumu', value: d},
		{ name: 'Kalan Süre', value: h}
	)
	.setTimestamp()

message.channel.send({ embeds: [exampleEmbed] }); 

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "durum"
};