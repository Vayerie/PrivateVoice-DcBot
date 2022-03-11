const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
//import the Discord Library
const Discord = require("discord.js");
//Start the module
module.exports = client => {
  /** ////////////////////////////////////////// *
   * CREATE A CATEGORY FOR EACH SINGLE COMMAND
   * ////////////////////////////////////////// *
   */
  client.category = {
    "general": ["ping", "support", "server", "video", "info", "stats", "stat", "uptime", "add", "invite", "github", "prefix", "sl"],
    "voice": ["lock", "unlock", "kick", "vcinvite", "vcadd", "voiceinvite", "voiceadd", "blacklist", "unblacklist", "whitelist", "unwhitelist", "rename", "limit", "bitrate", "promote"],
    "setup": ["setup", "setname", "setup2", "setname2", "setup3", "setname3"]
  };
  /** ////////////////////////////////////////// *
   * LOG EVERY TIME THE BOT GETS READY and STATUS CHANGE
   * ////////////////////////////////////////// *
   */
  client.on("ready", (bah) => {
    require("../modules/events/ready")(client)
  });

  /** ////////////////////////////////////////// *
   * LOG EVERY SINGLE MESSAGE
   * ////////////////////////////////////////// *
   */
  client.on("messageCreate", (message) => {
    require("../modules/events/message")(client, message)
  });

  /** ////////////////////////////////////////// *
   * INFO MSG ON INVITE
   *  ////////////////////////////////////////// *
   */
  client.on("guildCreate", (guild) => {
    require("../modules/events/guildCreate")(client, guild)
  });

  console.log(` :: ⬜️ Module: cmds`)
};
