//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { databasing, escapeRegex } = require("../../modules/functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
// HERE THE EVENT STARTS
module.exports = (client, message, args, cmd, prefix) => {
  if (cmd === "setup") {
    if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("You Do Not Have Permission To Use This Command")] });
    let {
      channel
    } = message.member.voice;
    if (channel) {
      message.reply({
        embeds: [new Discord.MessageEmbed()
          //.setTitle("Setup Complete for Join To Create")
          .setColor(ee.color)
          .setDescription(`<:Voice:932252642728636427> **Join To Create Setup Was Completed**\n\nNew Join To Create Channel: ${channel}`)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      client.settings.set(message.guild.id, channel.id, `channel`)
    } else {
      message.guild.channels.create("Join To Create", {
        type: 'GUILD_VOICE',
        bitrate: 8000,
        userLimit: 1,
        permissionOverwrites: [ //update the permissions
          { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
            id: message.guild.id,
            allow: ['VIEW_CHANNEL', "CONNECT"],
            deny: ["SPEAK"]
          },
        ],
      }).then(vc => {
        if (message.channel.parent) vc.setParent(message.channel.parent.id)
        message.reply({
          embeds: [new Discord.MessageEmbed()
            //.setTitle("<778404076466602024> Setup Complete for Join To Create")
            .setColor(ee.color)
            .setDescription(`<:Voice:932252642728636427> **Join To Create Setup Was Completed**\n\nNew Join To Create Channel: ${vc}`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
        client.settings.set(message.guild.id, vc.id, `channel`);
      })
    };

    return
  } else if (cmd === "setname") {

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("You Do Not Have Permission To Use This Command")] });
    if (!args[0]) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(`**You Did Not Add A Channel Name**\n\nDo \`${prefix}setupname [new Channel Name]\` | Note: {user} will be replaced with username*`)] });
    if (args[0].length > 32) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(`**The Channel Name You Provided Was Too Long**\n\nThe maximum length for a Channel name is \`32\` Letters`)] });
    client.settings.set(message.guild.id, args.join(" "), "channelname");
    message.reply({
      embeds: [new Discord.MessageEmbed()
        //.setTitle("<778404076466602024> Successfully changed the Channelname for the temp. Channels")
        .setColor(ee.color)
        .setDescription(`<:Voice:932252642728636427> **Default Private Voice Channel Name Was Changed Successfully**\n\nNew Private Voice Channel Name: \`${client.settings.get(message.guild.id, "channelname")}\`\n\nPreview:: \`${client.settings.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    return;
  }
}