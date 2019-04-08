const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: false});

bot.on("ready", async () => {
  bot.user.setPresence({status: 'Idle' })
console.log(`${bot.user.username} is online in ${bot.guilds.size} Servers:`)
bot.guilds.forEach((guild) => {
  console.log(" " + guild.name)
})
  bot.user.setActivity(`/help | /invite | In ${bot.guilds.size} servers!`, {type: "WATCHING"});
});

  // console.log is the terminal; if the bot is started correcty, it will send the message 
  //  console.log(`${bot.user.username} is active in ${bot.guilds.size} servers!`);


  //bot.user.setGame("Lookin' out for ya!");


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const prefix = botconfig.prefix;
  const messageArray = message.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  const bicon = bot.user.displayAvatarURL;

  if(cmd === `${prefix}kick`){

    // Correct Usage:
    // /kick @user <reason>

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("❌ **Error 404:** You need to **mention** a user for this command to work!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" ❌ **You do not have permissoins to use ths command**!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" ❌**ERROR:** The user is mod/admin, or has a higher role than me. I can't do that.");
// Declare the var, create embed:::
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("*Kick*")
    .setColor("#bf4848")
    .addField("Kicked User", `${kUser} (${kUser.id})`)
    .addField("Kicked By", `<@${message.author.id}> (${message.author.id})`)
    .addField("Kicked In", message.channel)
    .addField("Kicked At", message.createdAt)
    .addField("Reason", kReason)
    .setFooter("Use /invite to invite me to your server!")

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("❌Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
// ^^^^^^ End of cmd ^^^^^
    return;
  }

  

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("❌ **Error:** You need to memtion a user for this command to work!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌You need the **Ban Members** permission to use this command!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌That user is mod/admin, I can't do that!");
    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("**~Ban~**")
    .setColor("#ff0000")
    .addField("Banned User", `${bUser} (${bUser.id})`)
    .addField("Banned By", `<@${message.author.id}> (${message.author.id})`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!")

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("❌ Can't find incidents channel. Please create one for this command to work!");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    if(cmd === `${prefix}mention-everyone`){
// /mentoin-everyone
// Bot mentions @everyone 

      return message.channel.send(`<@${message.author.id}> mentioned @everyone!`)
    }

    return;

  }

  if(cmd === `${prefix}report`){

    // USAGE: 
    // /report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("❌Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("~~-------~~**__NEW REPORT!__**~~-------~~")
    .setColor("#ff0000")
    .addField("Reported User", `${rUser} (${rUser.id})`)
    .addField("Reported By", `${message.author} (${message.author.id})`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason)
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!");

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("❌Couldn't find reports channel. Please **create one for this command to work!**");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()

    .setDescription("**__Server Information__**")
    .setColor("#00ffd4")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!");

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    
    coder = "sad (Eclipse)#3728";
    current = "**sad (Eclipse)#3728** is my current owner!";
    ron = "main.js"

    let botembed = new Discord.RichEmbed()
    .setDescription("**__Bot Information__**")
    .setColor("#7c9dcc")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Coded By", coder)
    .addField("Owned by", current)
    .addField("Running on", ron)
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!");
    //.addField("Uptime", uptime);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}mytag`){

    let mytagembed = new Discord.RichEmbed()

    .setDescription("username#discrim + ID:")
    .setColor("#000000")
    .addField("username#discrim:", message.member.user.tag)
    .addField("Your Discord user ID:", message.author.id)
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!");
// message.member.user.tag displays the user in form, user#discrim
    return message.channel.send(mytagembed);
  }                                     


  if(cmd === `${prefix}owner`){

    let bicon = bot.user.displayAvatarURL;
    let ownerembed = new Discord.RichEmbed()
    .setDescription("**sad (Eclipse)#3728** is my owner! He coded every one of my lines!")
    .setColor("#15a3f0")
    .setTimestamp()
    .setFooter("Use /invite to invite me to your server!");

    return message.channel.send(ownerembed);
  }

  if(cmd === `${prefix}invite`){

    serverinvurl = "https://discord.gg/2dbQt8d";
    invurl = "https://discordapp.com/oauth2/authorize?client_id=517730016520568853&scope=bot&permissions=8";
    let bicon = bot.user.displayAvatarURL;
    const inviteEmbed = new Discord.RichEmbed()
    .setDescription("**__Useful Links!__**")
    .setColor("#bc9562")
    .setThumbnail(bicon)
    .addField("Invite Bot: ", invurl)
    .addField("Support Server: ",serverinvurl)
    .setTimestamp()
    
    return message.channel.send(inviteEmbed);
  }

                                                        

if(cmd === `${prefix}git`){

    let gitrepembed = new Discord.RichEmbed()
    .setTitle("Find my source code here!")
    .setColor("#dd8e49")
    .setTimestamp()
    .setURL("https://github.com/asadhum2005/mybot.discord.js")
    .setFooter("Use /invite to invite me to your server!");

    return message.channel.send(gitrepembed);

  }
    
if(cmd === `${prefix}quotes`){

  q1 = "  -- Andres Iniesta";
  q2 = "  -- French Poverb";
  q3 = "  -- www.quotesgate.com";

  quotes = new Discord.RichEmbed()

.setDescription("**__Here are some inspirational quotes!__**")
.setColor("#319786")
.addField("**Some people like you, some people don't. In the end, you just have to be yourself.**", q1)
.addField("**Wherever life plants you, bloom with grace**", q2)
.addField("Don’t forget you’re human. It’s okay to have a meltdown. Just don’t unpack and live there. Cry it out. Then refocus on where you’re headed", q3)
.setFooter("Use /invite to invite me to your server!");

return message.channel.send(quotes);

}

if(cmd === `${prefix}r`){

  rrrrembed = new Discord.RichEmbed()

  .setDescription("The bot is being restarted... **Please Wait..**")
  .setColor("#648747")
  .setTimestamp()
  .setFooter("Use /invite to invite me to your server!");
  message.delete(0);


  //       message.delete(0); 
  // This deletes the command invocation message...

  return message.channel.send(rrrrembed);

}

if(cmd === `${prefix}problem1`){

  problem1solved = new Discord.RichEmbed()

.setTitle("I have been fixed. Click here to see who fixed me...")
.setURL("https://stackoverflow.com/questions/55550668/why-does-it-say-setdescription-is-not-a-function-richembed-in-javascript")
.setTimestamp()
.setAuthor("Stack Overflow Question")
.setColor("#ff0000")
.setFooter("use /invite to invite me to your server!")

return message.channel.send(problem1solved);

}

if (message.content === 'hello'){

  hii = new Discord.RichEmbed()

  .setDescription("Why hello there!")
  .setColor("#ffff00")
  .setFooter("use /invite to invite me to your server!")

  return message.channel.send(hii);

}

if(cmd === `${prefix}myav`){

const av = message.author.avatarURL;
avembed = new Discord.RichEmbed()

  .setImage(av)
  .setColor("#848058")

  return message.channel.send({embed: avembed});
  
}

if(cmd === `${prefix}token`){

  howdumami = new Discord.RichEmbed()
  
  .setTitle("Here's my token...Keep it safe!")
  .setDescription("||How dumb do you think I am?||")
  .setColor("#ff0000")
  .setTimestamp()
  .setFooter("Use /invite to invite me to your server!");

return message.channel.send(howdumami);

}

if(cmd === `${prefix}polish`){

  polishembed = new Discord.RichEmbed()

  .setDescription("You have polished your head and made it shine!")
  .setColor("#ffff00")
  .setFooter("Use /invite to invite me to your server!");

  return message.channel.send(polishembed);
}

if(cmd === `${prefix}ping`){

  return message.channel.send("*pong!*")

}

if(cmd === `${prefix}hosting`){

  hostembed = new Discord.RichEmbed()

  .setTitle("Get the best bot/web hosting here!")
  .setColor("#836190")
  .setURL("https://www.seimaxim.com/")
  .setTimestamp()

  return message.channel.send(hostembed);
}

if(cmd === `${prefix}help`){

  reporthelp = "Report a user. Requires a channel named `reports`to work!";
  kickhelp = "Kick a user from the server. Requires a channel named `incidents` to work; you must have the manage messages permission.";
  banhelp = "Ban a user from the server. Requires a channel named `incidents` to qork; toy need the BAN MEMBERS permission to use this command!";
  warnhelp = "**COMMAND COMING SOON!**";
  requiredperms = "**Embed Links, channel named `incidents`; channel named `reports`; Kick Members, Ban Members, Manage Roles, Manage Members.**"
  helpEmbed = new Discord.RichEmbed()

  .setDescription(" 💬 **__Help Is Here!__** 💬")
  .setColor("#936285")
  .addField("**/report @user <reason>**", reporthelp)
  .addField("**(COMING SOON)** /warn @user <reason>", warnhelp)
  .addField("**/kick @user <reason>**", kickhelp)
  .addField("**/ban @user <reason>**", banhelp)
  .addField("**/mytag**", "Shows you **your** discoord username#discrim and your user ID. Requires Embed Links permission.")
  .addField("**/invite**", "Get a linkto incite meto our server, and an invite link to my suppoer server")
  .addField("**/owner**", "see who currently owns the bot")
  .addField("**/git**", "**SOURCE CODE AVAILIBLE SOON**")
  .addField("**/token**", "View the bot's super secret bot token!")
  .addField("**/serverinfo**", "displays some basic server information!")
  .addField("**/botinfo**", "displays basic bot information!")
  .addField("**/ping**", "Get the bot to respond with `pong` ")
  .addField("**/hosting**", "Bot finds a good website for bot/web hosting")
  .addField("**/quotes**", "bot responds with some lovely quotes!")
  .addField("**__Required Permissions__**", requiredperms)
 // .addField("**COMING SOON!**/suggest <suggestion>", "suggest something. Requires channel named `suggestions`")
  .setTimestamp()
  .setFooter("Use /invite to invite me to your server!")


  return message.channel.send({embed: helpEmbed});

  
}

if(cmd === `${prefix}test`){

  test = new Discord.RichEmbed()

  .setDescription("**__I AM ALIVE!__**")
  .setColor("#765836")

  return message.channel.send({embed: test});

}

if(cmd === `${prefix}puke`){
  // USAGE:
  // /puke
puke = message.member.user.tag

  return message.channel.send(puke, "has puked everywhere!")
}

if (cmd === `${prefix}suggest`) {
  // USAGE:
  // /suggest this is the suggestion

  const suggestion = args.join(' ').slice(22);

  const suggestEmbed = new Discord.RichEmbed()
      .setDescription(' 💬 ~~-------~~**__NEW SUGGESTION!__**~~-------~~')
      .setColor('#ff0100')
      .addField('Suggestion By', `${message.author} (${message.author.id})`)
      .addField('Channel', `${message.channel.name}`)
      .addField('Time', `${message.createdAt}`)
      .addField('Suggestion', `${suggestion}`)
      .setTimestamp()
      .setFooter('Use /invite to invite me to your server!');

  const suggestchannel = message.guild.channels.find(`name`, 'suggestions');
  if (!suggestchannel) return message.channel.send("❌Couldn't find suggestions channel. Please **create one for this command to work!**");


  message.delete().catch(O_o => {});
  suggestchannel.send({ embed: suggestEmbed });
}

if(cmd === `${message.author.id}`){

  return message.channel.send("WELL DONE ! YOU KNOW YOUR USER ID! DAMM!")
}

});

bot.login(tokenfile.token);
// END OF CODE !!

// ============================ EXTRA INFO AND STUFFS ==============================
/* Bot token:

YOUR TOKEN HERE FOR SAFE KEEPING 

*/

///// github repository :
/// https://github.com/asadhum2005/mybot.discord.js


// https://stackoverflow.com/questions/55569361/i-keep-getting-an-error-in-discord-js-discord-is-not-defined-or-i-get-no-respo
// https://stackoverflow.com/questions/55559630/richembed-fields-may-not-be-empty-error-how-would-i-fix-this
// https://stackoverflow.com/questions/55557723/whats-wrong-with-my-code-i-dont-get-an-error-i-get-no-response-what-so-ever

  // TERE MAY BE STABILITY FIXES AND UPDATES. PLEASE CHECK BACK HERE FOR THE UPDATED CODE.
// Total 456 Lines of code used in the prduction of ./main.js 
// This code has been created by: sad (Eclipse)#3728
// This is the current most stabe version of the sourcecode availbe!
// I am working my hardest to keep adding new STABLE & WORKING commands.