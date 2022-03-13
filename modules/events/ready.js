//IMPORT LOGGER DATA
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
//IMPORT FILE DATA
const { databasing, escapeRegex, change_status } = require("../../modules/functions");
//IMPORT THE DISCORD LIBRARY
const Discord = require("discord.js");
// HERE THE EVENT STARTS
module.exports = (client) => {
    console.log("BOT IS READY " + client.user.tag)
    change_status(client);
    //loop through the status per each 10 minutes
    setInterval(() => {
        change_status(client);
    }, 10 * 1000)
    
    const date = `${moment().format("YYYY/MM/DD - hh:mm:ss")}`;
    const DMC = client.channels.cache.get(client.logger);
    const content = `\`\`\`ini\n[ ${client.user.username} Is Online ]\n[ Ready On ${client.guilds.cache.size} Servers ]\`\`\``;
    const embed = new MessageEmbed()
          //.setTitle(date)
          .setDescription(`<:Up:944799104909836289> **${date}**\n\n${content}`)
          .setColor(client.embedColor);
        DMC.send({embeds: [embed]});
};