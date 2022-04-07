//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {
  databasing,
  escapeRegex
} = require("../../modules/functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
// HERE THE EVENT STARTS
module.exports = (client, message, args, cmd, prefix) => {
  if (cmd === "lock") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);

    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      vc.permissionOverwrites.set([{
        id: message.guild.id,
        allow: ['VIEW_CHANNEL'],
        deny: ['CONNECT']
      }])
        .then(lol => {
          vc.permissionOverwrites.create(message.author.id, {
            MANAGE_CHANNELS: true,
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true,
            CONNECT: true
          })
          return message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.color)
              .setDescription(`**Your Private Channel Has Been Locked**\n\nNo One Can Acess Your Private Channel Now.`)
              .setFooter(ee.footertext, ee.footericon)
            ]
          })
        })

    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "unlock") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      vc.permissionOverwrites.create(message.guild.id, {
        VIEW_CHANNEL: true,
        CONNECT: true
      }).then(lol => {
        vc.permissionOverwrites.create(message.author.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        });
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**Your Private Channel Has Been Unlocked**\n\nEveryone Can Acess Your Private Channel Now.`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "kick") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`))
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Kick**\n\nDo \`${prefix}kick @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Kick**\n\nDo \`${prefix}kick @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      if (!member.voice.channel)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**The User You Provided Was Not Connected To Your Private Voice Channel**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (member.voice.channel.id != channel.id)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**The User You Provided Was Not Connected To Your Private Voice Channel**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      try {
        member.voice.disconnect();
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**${member.user.tag} Was Kicked From Your Private Voice Channel**`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      } catch (e) {
        console.log(String(e.stack).bgRed);
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            //.setTitle(" An Error occurred")
            .setDescription(`**Sorry There Was An Error**\n\n\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      }
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (["vcinvite", "vcadd", "voiceinvite", "voiceadd"].includes(cmd)) {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Invite**\n\nDo \`${prefix}invite @User [optional Message]\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User To Invite Them")
          .setDescription(`**You Must Provide A User To Invite**\n\nDo \`${prefix}invite @User [optional Message]\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let txt = args.slice(1).join(" ");
      try {
        channel.createInvite().then(invite => {
          vc.permissionOverwrites.create(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.permissionOverwrites.create(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            });
            member.user.send({
              embeds: [new Discord.MessageEmbed()
                .setColor(ee.color)
                //.setTitle(`You got invited to join ${message.author.tag}'s Voice Channel`)
                .setDescription(`**You Were Invited To Join ${message.author.tag}'s Private Voice Channel**\n\n[Click here](${invite.url}) to join **${channel.name}**\n\n${txt ? txt : ""}`.substr(0, 2000))
                .setFooter(ee.footertext, ee.footericon)
              ]
            }).catch(e => {
              console.log(String(e.stack).bgRed);
              return message.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  //.setTitle(` Error | Couldn't Dm \`${member.user.tag}\``)
                  .setDescription(`**Could Not DM ${member.user.tag}**\n\nThey Might Have Their DMs Closed Or Else There Was An Error`)
                  .setFooter(ee.footertext, ee.footericon)
                ]
              })
            })
          });
          return message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.color) 
              .setDescription(`**${member.user.tag} Was Invited To Your Private Voice Channel**\n\n*An Invitation Link Will Be Sent Through Their DMs*`)
              .setFooter(ee.footertext, ee.footericon)
            ]
          })
        })

      } catch (e) {
        console.log(String(e.stack).bgRed);
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            //.setTitle(" An Error occurred")
            .setDescription(`**Sorry There Was An Error**\n\n\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      }
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "blacklist") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Blacklist**\n\nDo \`${prefix}blacklist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User Blacklist**\n\nDo \`${prefix}blacklist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      if (member.voice.channel && member.voice.channel.id == channel.id)
        try {
          member.voice.disconnect();
          message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.color)
              //.setTitle(`Disconnected ${member.user.tag} out of your Channel`)
              .setDescription(`**${member.user.tag} Was Kicked Out Of Your Private Voice Channel**`)
              .setFooter(ee.footertext, ee.footericon)
            ]
          })
        } catch (e) {
          console.log(String(e.stack).bgRed);
          message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              //.setTitle(" An Error occurred")
              .setDescription(`**Sorry There Was An Error**\n\n\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
              .setFooter(ee.footertext, ee.footericon)
            ]
            //
          })
        };
      vc.permissionOverwrites.create(member.user.id, {
        VIEW_CHANNEL: true,
        CONNECT: false
      }).then(lol => {
        vc.permissionOverwrites.create(message.author.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        });
        message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**${member.user.tag} Is Now Blacklisted To Your Private Voice Channel**\n\nThey Can Not Acess Your Private Voice Channel Anymore`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })


    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "unblacklist") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`Do \`${prefix}unblacklist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Remove From Blacklist**\n\nDo \`${prefix}unblacklist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      vc.permissionOverwrites.create(member.user.id, {
        VIEW_CHANNEL: true,
        CONNECT: true
      }).then(lol => {
        vc.permissionOverwrites.create(message.author.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        });
        message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**${member.user.tag} Is Removed From Blacklist To Your Private Voice Channel**\n\nThey Can Now Acess Your Private Voice Channel`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "whitelist") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Have To Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Whitelist**\n\nDo \`${prefix}whitelist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Whitelist**\n\nDo \`${prefix}whitelist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      vc.permissionOverwrites.create(member.user.id, {
        VIEW_CHANNEL: true,
        CONNECT: true
      }).then(lol => {
        vc.permissionOverwrites.create(message.author.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        });
        message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`${member.user.tag} Is Now Whitelisted To Your Private Voice Channel\n\nThey Can Now Acess Your Locked Private Voice Channel`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "unwhitelist") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Have To Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Remove From Whitelist**\n\nDo \`${prefix}unwhitelist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Remove From Whitelist**\n\nDo \`${prefix}unwhitelist @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      vc.permissionOverwrites.create(member.user.id, {
        VIEW_CHANNEL: true,
        CONNECT: false
      }).then(lol => {
        vc.permissionOverwrites.create(message.author.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        });
        message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`${member.user.tag} Is Removed From Whitelist To Your Private Voice Channel\n\nThey Can No Longer Acess Your Locked Private Voice Channel`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "limit") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription("**You Must Provide A Limit To Set**\n\nDo \`.limit [0 - 99]\`")
        ]
      });
      if (isNaN(args[0])) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription("**You Must Provide A Number To Set For Limit**\n\nDo \`.limit [0 - 99]\`")
        ]
      });
      let userlimit = Number(args[0]);
      if (userlimit > 99 || userlimit < 0) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription("**You Must Provide A Number In Range**\n\nDo \`.limit [0 - 99]\`")
        ]
      });
      channel.setUserLimit(userlimit).then(vc => {
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**User Limit Was Set To ${vc.userLimit}**\n\nOnly \`${vc.userLimit}\` Users Can Join Your Private Voice Channel`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "bitrate") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription("**You Must Provide A Number To Set The Bitrate**\n\nDo \`.bitrate [8000 - 96000]\`\n\n*Note* - Normal Voice Channel Runs At \`64000\` Bits")
        ]
      });
      if (isNaN(args[0])) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription("**You Must Provide A Number To Set For The Bitrate**\n\nDo \`.bitrate [8000 - 96000]\`\n\n*Note* - Normal Voice Channel Runs At \`64000\` Bits")
        ]
      });
      let maxbitrate = 96000;
      let boosts = message.guild.premiumSubscriptionCount;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;
      let userlimit = Number(args[0]);
      if (userlimit > maxbitrate || userlimit < 8000) return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription(`**You Must Provide A Number In Range**\n\nDo \`${prefix}bitrate [8000 - 96000]\`\n\n*Note* - Normal Voice Channel Runs At \`64000\` Bits`)
        ]
      });
      channel.setBitrate(userlimit).then(vc => {
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**Bitrate Was Set To ${vc.bitrate}**\n\nYour Private Voice Channel Will Be Running In \`${vc.bitrate}\` Bits\n\n*Note* - Normal Voice Channel Runs At \`64000\` Bits`)

            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } else if (cmd === "rename") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        //.setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({ 
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`**You Did Not Provide A Channel Name**\n\nDo \`${prefix}rename [New Channel Name]\`*`)
        ]
      });
      if (args[0].length > 32) return message.reply({ 
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`**The Channel Name You Provided Was Too Long**\n\nThe Maximum Length For A Channel Name Is \`32\` Letters`)
        ] 
      });

      let setChannelName = args[0];

      channel.setName(setChannelName).then(vc => {
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**Private Voice Name Was Set To *${vc.name}* **`)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      })
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }

  } else if (cmd === "promote") {
    let {
      channel
    } = message.member.voice;
    if (!channel) return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
        .setFooter(ee.footertext, ee.footericon)
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
      var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(message.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true
      };
      if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
      if (!owner)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("**You Must Be The Owner Of This Private Voice Channel To Use This Command**")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (!args[0]) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Promote Them**\n\nDo \`${prefix}promote @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          //.setTitle("You Must Mention A User")
          .setDescription(`**You Must Provide A User To Promote Them**\n\nDo \`${prefix}promote @User\``)
          .setFooter(ee.footertext, ee.footericon)
        ]
      });
      if (!member.voice.channel)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("****The User You Provided Was Not Connected To Your Private Voice Channel****")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      if (member.voice.channel.id != channel.id)
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("****The User You Provided Was Not Connected To Your Private Voice Channel****")
            .setFooter(ee.footertext, ee.footericon)
          ]
        });
      try {
        vc.permissionOverwrites.create(member.user.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true
        }).then(l => {
          vc.permissionOverwrites.create(message.author.id, {
            MANAGE_CHANNELS: false,
            VIEW_CHANNEL: true,
            MANAGE_ROLES: false,
            CONNECT: true
          })
            .then(lol => {
              client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, member.user.id);
              return message.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(`${member.user.tag} Was Promoted To The Owner Of This Private Voice Channel`)
                  .setFooter(ee.footertext, ee.footericon)
                ]
              })
            })
        })
      } catch (e) {
        console.log(String(e.stack).bgRed);
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(`**Sorry There Was An Error**\n\n\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      }
    } else {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription("**You Must Be In A Private Voice Channel To Use This Command**")
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  }
};