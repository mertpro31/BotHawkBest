const Discord = require("discord.js");
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const mysql = require("mysql2");
const fs = require("fs");
const db = require("croxydb")

exports.run = async (client, message, args) => {
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor(0x0099FF)
	.setTitle('Bilgi Menüsü')
	.addFields(
		{ name: 'Sorgulamak için', value: '.as İSİM SOYİSİM' },
		//{ name: '+18 Ad Soyad -> Bilgi | BAKIM', value: '!mrns AD SOYAD ' },
		{ name: 'GSM -> TC', value: '.gt GSM' },
		{ name: 'TC -> GSM', value: '.tg TC' },
		{ name: 'TC -> Bilgi', value: ".tc TC" },
		//{ name: 'TC -> Sınıf | BAKIM', value: ".ts TC" },
		{ name: 'ping', value: client.ws.ping + "ms" }
		
	)
	.setTimestamp()

	.setFooter({ text: 'Made by !HzPunchmax#6666'});

message.channel.send({ embeds: [exampleEmbed] });

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};