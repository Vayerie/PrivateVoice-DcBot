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

  if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return message.reply("Please give me the Permission, to Send Embeded Messages!");

  if (!args[0])
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        //.setTitle("<:Up:944799104909836289> These Are The Command Catagories!")
        //.setURL("https://youtu.be/zNE8insVgOA")
        .setDescription(`<:Up:944799104909836289> **These Are The Command Catagories!**\n\n**Prefix**: \`${prefix}\` | [Click Here - Support Server](https://discord.gg/4eR3BjQjt4)\n\n*Enter The Catagories To See Informations For The Commands.* \n[\`Invite Private Voice\`](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [\`Support Server\`](https://discord.gg/4eR3BjQjt4) | Developed By Kos#9100`)
        .addField(`<:One:946041613220716564> **${prefix}Help General**`, "*Shows All General/Information Commands!*", true)
        .addField(`<:Two:946041613052956753> **${prefix}Help Setup**`, "> *Shows All Setup Voice System Commands!*", true)
        .addField(`<:Three:946041613258473502> **${prefix}Help Voice**`, "> *Shows All Voice Moderation Commands!*", true)
      ]
    });
  switch (args[0].toLowerCase()) {
    case "general": {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          //.setTitle("Commands For General")
          //.setURL("https://youtu.be/zNE8insVgOA")
          .setDescription(`<:Info:931908144626532403> **Commands For General**\n\n**Prefix**: \`${prefix}\` | [Click here - Support Server](https://discord.gg/4eR3BjQjt4)`)
          .addField(`\`${prefix}Help\``, "> *Shows All Available Commands!*", true)
          .addField(`\`${prefix}Add\``, `> *[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) Private Voice System*`, true)
          .addField(`\`${prefix}Support\``, "> *Link for [SUPPORT SERVER](https://discord.gg/4eR3BjQjt4)*", true)
          .addField(`\`${prefix}Ping\``, "> *Shows The Ping Of The Bot*", true)
          .addField(`\`${prefix}Uptime\``, "> *Shows Uptime Of The Bot*", true)
          .addField(`\`${prefix}Info\``, "> *Shows Information & Stats Of The Bot*", true)
          .addField(`\`${prefix}Prefix\``, "> *Change The Prefix For The Bot*", true)
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    };
      break;
    case "setup":
      {
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            //.setTitle("Commands For Setup")
            //.setURL("https://youtu.be/zNE8insVgOA")
            .setDescription(`<:Gear:951453383426982009> **Commands For Setup**\n\n**Prefix**: \`${prefix}\` | [Click here - Support Server](https://discord.gg/4eR3BjQjt4)`)
            .addField(`\`${prefix}Setup\``, "> *Setup A Join To Create Channel*")
            .addField(`\`${prefix}Setname <ChannelName>\``, "> *Changes The Default Private Voice Channel Name For Setup* \nExample: \`${prefix}setname {user}'s VC\`" + `\n**Note:** *Having \`{user}\` In Your Channel Name Will Be Replaced By The User's Username*`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      };
      break;
    case "voice": {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          //.setTitle("<:Three:946041613258473502> **Commands For Voice**")
          //.setURL("https://youtu.be/zNE8insVgOA")
          .setDescription(`<:Voice:932252642728636427> **Commands For Voice**\n\n**Prefix**: \`${prefix}\` | [Click here - Support Server](https://discord.gg/4eR3BjQjt4)`)
          .addField(`\`${prefix}Lock\``, "> Locks the Voice Channel (makes it Private)!", true)
          .addField(`\`${prefix}Unlock\``, "> *Unlocks the Voice Channel (makes it public)!*", true)
          .addField(`\`${prefix}Kick @User\``, "> *Kicks a User out of Your Channel!*", true)
          .addField(`\`${prefix}Blacklist @User\``, "> *Kicks and blacklist a User from Your Channel!*", true)
          .addField(`\`${prefix}Unblacklist @User\``, "> *Unblacklist (trust) a User for Your Channel!*", true)
          .addField(`\`${prefix}Whitelist @User\``, "> *Whitelist a User to your Channel!*", true)
          .addField(`\`${prefix}Unwhitelist @User\``, "> *Remove a User from whitelist to your Channel!!*", true)
          .addField(`\`${prefix}Rename <CHANNEL_NAME>\``, "> *Renames the Channel Name (20 Sec cooldown) BETA VERSION*", true)
          .addField(`\`${prefix}Limit <UserLimit>\``, "> *Set's the Channel's UserLimit (how many can join)*", true)
          .addField(`\`${prefix}Bitrate <Bitrate in bits>\``, "> *Set's the Channel's bitrate*", true)
          .addField(`\`${prefix}VCinvite @User [Optional Message To Them]\``, "> *Invites a User for your Voice Channel*", true)
          .addField(`\`${prefix}Promote @User\``, "> *Make someone else owner in your Channel*", true)
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    };
      break;
    default:
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          //.setTitle("These Are The Command Catagories!")
          //.setURL("https://youtu.be/zNE8insVgOA")
          .setDescription(`<:Up:944799104909836289> **These Are The Command Catagories!**\n\n**Prefix**: \`${prefix}\` | [Click here - Support Server](https://discord.gg/4eR3BjQjt4)\n\n\`.help general\`\n[\`INVITE ME\`](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | Developed By Kos#9100`)
          .addField(`<:One:946041613220716564> **${prefix}Help General**`, "> *Shows All General/Information Commands!*", true)
          .addField(`<:Two:946041613052956753> **${prefix}Help Setup**`, "> *Shows All Setup Voice System Commands!*", true)
          .addField(`<:Three:946041613258473502> **${prefix}Help Voice**`, "> *Shows All Voice Moderation Commands!*", true)
        ]
      });
      break
  }
};