//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {
    databasing,
    escapeRegex,
    reset_DB
} = require("../../modules/functions");
//import the Discord Library
const Discord = require("discord.js");
// HERE THE EVENT STARTS
module.exports = (client, guild, prefix) => {
    if (!guild) return;
    //find a channel instance, inside of the guild, where the bot has the Permission, to send a message
    let channel = guild.channels.cache.find(channel =>
        channel.type == "GUILD_TEXT" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    //if no channel found return
    if (!channel) return;
    //reset the database
    reset_DB(guild.id, client);
    //if they has the permissions to send embeds, send an embed
    if (channel.permissionsFor(guild.me).has("EMBED_LINKS")) {
        channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(ee.color)
                    //.setTitle("These Are The Command Catagories!")
                    .setDescription(`<:Up:944799104909836289> **These Are The Command Catagories!**\n\n**Default Prefix**: \`${prefix}\` | [Click here - Support Server](https://discord.gg/4eR3BjQjt4)\n\n*Enter The Catagories To See Informations For The Commands.* \n[\`Invite Private Voice\`](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [\`Support Server\`](https://discord.gg/4eR3BjQjt4) | Developed By Kos#9100`)
                    .addField(`\`.help general\``, "> *Shows all general/Information Commands!*", true)
                    .addField(`\`.help setup\``, "> *Shows you all Setup related Commands (how to create a setup, etc.)*", true)
                    .addField(`\`.help voice\``, "> *Shows you all Voice Channel (hosted) related Commands*", true)
            ]
        })
        channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(ee.color)
                .setTitle("Thanks For The Invite")
                .setDescription(`To Get More Informations Type \`.help\`\n To Get Started Type \`.help setup\` And Follow The Steps`)
                .setFooter(ee.footertext, ee.footericon)]
        })
    } else {
        channel.send(`**Thanks For The Invite**\n\nTo Get More Informations Type \`.help\`\n To Get Started Type \`.help setup\` And Follow The Steps`);

    }
};