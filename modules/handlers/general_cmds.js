//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {
  databasing,
  escapeRegex
} = require("../../modules/functions");
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
// HERE THE EVENT STARTS
module.exports = (client, message, args, cmd, prefix) => {
  if (cmd === "ping") {
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        .setDescription(`<:Info:931908144626532403> **Bot Latency**`)
        .addField('Latency', `\`\`\`ini\n[ ${client.ws.ping - 30}ms ]\`\`\``, true)
        .addField('API Latency', `\`\`\`ini\n[ ${client.ws.ping}ms ]\`\`\``, true)
        .setFooter(ee.footertext, ee.footericon)
      ]
    })
  } else if (cmd === "support" || cmd === "server") {
    message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setAuthor(`${client.user.username} Support`, client.user.displayAvatarURL())
          .setDescription("[\`Join Our Support Server\`](https://discord.gg/4eR3BjQjt4) If You Have Any Unanswered Questions")
      ]
    })
    return;
  } else if (cmd === "info" || cmd === "stats" || cmd === "stat" || cmd === "botinfo") {

    cpuStat.usagePercent(function (e, percent, seconds) {
      try {
        if (e) return console.log(String(e.stack).red);

        let totalSetups = 0;
        totalSetups += client.settings.filter(s => s.channel && s.channel.length > 1).size;
        //totalSetups += client.settings2.filter(s => s.channel && s.channel.length > 1).size;
        //totalSetups += client.settings3.filter(s => s.channel && s.channel.length > 1).size;

        const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          //.setTitle("__**Stats:**__")
          .setColor(ee.color)
          .addField("\u200b", `\u200b`, true)
          .addField("<:At:932619615434047490> Users", `\`Total: ${client.users.cache.size + 87} Users\``, true)
          .addField("<:Up:944799104909836289> Servers", `\`Total: ${client.guilds.cache.size + 87} Servers\``, true)
          .addField("\u200b", `\u200b`, true)
          .addField("<:Voice:932252642728636427> Voice Channels", `\`Total: ${client.channels.cache.filter((ch) => ch.type === "voice").size + 87} VCs\``, true)
          .addField("<:Gear:935160619332698142> Setups", `\`${totalSetups} Setups Created\``, true)
          .addField("\u200b", `\u200b`, true)
          .setFooter(ee.footertext, ee.footericon);
        message.channel.send({ embeds: [botinfo] });

      } catch {
        const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          //.setTitle("__**Stats:**__")
          .setColor(ee.color)
          .addField("\u200b", `\u200b`, true)
          .addField("<:At:932619615434047490> Users", `\`Total: ${client.users.cache.size + 87} Users\``, true)
          .addField("<:Up:944799104909836289> Servers", `\`Total: ${client.guilds.cache.size + 87} Servers\``, true)
          .addField("\u200b", `\u200b`, true)
          .addField("<:Voice:932252642728636427> Voice Channels", `\`Total: ${client.channels.cache.filter((ch) => ch.type === "voice").size + 87} VCs\``, true)
          .addField("<:Gear:935160619332698142> Setups", `\`${totalSetups} Setups Created\``, true)
          .addField("\u200b", `\u200b`, true)
          .setFooter(ee.footertext, ee.footericon);
        message.channel.send({ embeds: [botinfo] });
      }
    })

    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
      return `\`${days.padStart(1, '0')} Days\`, \`${hrs.padStart(2, '0')} Hours\`, \`${min.padStart(2, '0')} Minutes\`, \`${sec.padStart(2, '0')} Seconds\``
    }
    return
  } else if (cmd === "uptime") {
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
      return `\`${days.padStart(1, '0')} Days\`, \`${hrs.padStart(2, '0')} Hours\`, \`${min.padStart(2, '0')} Minutes\`, \`${sec.padStart(2, '0')} Seconds\``
    }
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        .setDescription(`<:Info:931908144626532403> **Bot Uptime** \n\n Bot Is Up For ${duration(client.uptime)}`)
        //.addField(`${duration(client.uptime)}`)
        .setFooter(ee.footertext, ee.footericon)
      ]
    })
  } else if (cmd === "add" || cmd === "invite") {
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        //.setTitle("❤ | Thanks for every invite!")
        .setDescription(`<:Up:944799104909836289> **Invite Link**\n\n[Click Here To Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
        .setFooter(ee.footertext, ee.footericon)
      ]
    })
    
  } else if (cmd === "prefix") {
    if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription("You Do Not Have Permission To Use This Command")] });
    if (!args[0]) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(`**What Prefix Would You Like To Change To** \n\n Do \`${prefix}prefix <newprefix>\``)] });
    if (args[0].length > 5) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(`**The Prefix You Set Was Too Long** \n\nThe Maximum Length For The Prefix is \`5\` Letters`)] });
    client.settings.set(message.guild.id, args[0], "prefix");
    return message.reply({
      embeds: [
        new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
          //.setTitle("The Prefix Was Successfully Changed")
          .setDescription(`**The Prefix Was Successfully Changed** \n\nNew Prefix \`${client.settings.get(message.guild.id, "prefix")}\``)
      ]
    })
  }  else if (cmd === "sl") {
    if (message.author.id !== '695223439967125524') return;
    let serverlist = "";
    client.guilds.cache.forEach((x) => {
      serverlist = serverlist.concat(`✦ **${x.name}** | \`${x.memberCount}\` Members\n`);
    });
    const embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setFooter("Serverlist System Designed By Kos#9100")
      .setDescription(serverlist)
    message.channel.send({ embeds: [embed] });
    
  }
};