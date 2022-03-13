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
module.exports = (client, message) => {

  //if message from a bot, or not in a guild return error
  if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
  try {
    //ensure the databases
    databasing(message.guild.id, client);
    // defining guild_settings 
    const guild_settings = client.settings.get(message.guild.id);
    //get the prefix from the DATABASE
    let { prefix } = guild_settings;
    // if mesage is from a bot
    if (message.author.bot) return;
    // if prefix in database is null
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift()?.toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
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
        })
      return
    };

    //if the Bot has not enough permissions return error
    /*let required_perms = ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"]
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS) && !message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS) && !message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES) && !message.guild.me.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL) && cmd != "help") {
      if (message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) {
        return message.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | I don't have enough Permissions!")
              .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") + "`")
          ]
        })
      } else {
        return message.reply("❌ Error | I don't have enough Permissions! Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") + "`")
      }
    };*/

    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL)) return;
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
      return message.reply(`I Do Not Have The Permission To Sent Embeds`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
      return message.reply(`I Do Not Have The Permission To Sent External Emojis`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
      return message.reply(`I Do Not Have The Permission To Add Reactions`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
      return message.reply(`I Do Not Have The Permission To Manage Channels`)

    //ALL CMDS, yes not looking great but its enough ;)
    if (["h", "help", "cmd"].includes(cmd))
      require("../../modules/handlers/help_cmd")(client, message, args, cmd, prefix)

    //fire a general command
    else if (client.category.general.includes(cmd))
      require("../../modules/handlers/general_cmds")(client, message, args, cmd, prefix)

    //fire a voice command
    else if (client.category.voice.includes(cmd))
      require("../../modules/handlers/voice_cmds")(client, message, args, cmd, prefix)

    //fire a setup command
    else if (client.category.setup.includes(cmd))
      require("../../modules/handlers/setup_cmds")(client, message, args, cmd, prefix)

    else {
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            //.setTitle("UNKNOWN CMD")
            .setDescription(`**Unknown Command**\n\nSorry I Don't Know This Command, Try \`${prefix}help\``)
            .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } catch (e) {
    console.log(e)
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          //.setTitle("ERROR | ERROR")
          .setDescription(`**Sorry There Was An Error**\n\n\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
      ]
    }).then((msg) => {
      setTimeout(() => { msg.delete() }, 7500)
    })/*.then(msg => msg.delete({
      timeout: 7500
    }))*/
  }
};