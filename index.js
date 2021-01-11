// ============== Consts ==============
const Discord = require('discord.js');
const moment = require('moment');
const { prefix, token, channel, GOOGLE_API_KEY } = require('./config.json');

const discord = require('discord.js');



const ytdl = require("ytdl-core");
const fmmpg = require("ffmpeg");






const YouTube = require("simple-youtube-api");
require("./server.js");


const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();


require('dotenv').config()
const client = new Discord.Client({
  disableMentions: 'everyone',
})


//constants
const VERSION = '0.1.1';
const CHANNEL = 'logchannel';



//bot is ready to start working, print status update to console
client.on('ready', function() {
    console.log('[META][INFO] Connected to Discord API Service');
});

//bot disconnected from Discord
client.on('disconnected', function() {
    console.log('[META][WARN] Disconnected from Discord API Service. Attempting to reconnected...');
});


//warning from Discord.js
client.on('warn', function(msg) {
    console.log('[META][WARN] ' + msg);
});

//error from Discord.js
client.on('error', function(err) {
    console.log('[META][ERROR] ' + err.message);
    process.exit(1);
});














// ============ Ready log ============
  client.on ("ready", () => {
    
    console.log('The Bot Is Ready!');
    console.log(`Logged In As ${client.user.username}#${client.user.discriminator}`);
	console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
	
	
    client.user.setPresence({
      status: 'dnd', // Can Be ONLINE, DND, IDLE, INVISBLE
      activity: {
          name: `${prefix}help`,
          type: 'LISTENING', // Can Be WHATCHING, LISTENING
      }
  })
  }); 

  // ============ USER =============
  client.on("message", m => {
    if (m.content.startsWith(`${prefix}user`)) {
        let user = (m.mentions.users.first()) || m.author;
        let member = m.mentions.members.first() || m.member;
    
    
        let userinfo = {};
        userinfo.avatar = user.displayAvatarURL()
        userinfo.name = user.username;
        userinfo.discrim = `#${user.discriminator}`;
        userinfo.id = user.id;
        userinfo.status = user.presence.status;
        userinfo.registered = moment(user.createdAt);
        userinfo.joined = moment(user.joinedAt);
    
        const userdate = new Discord.MessageEmbed()
        .setColor('#cad347')
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .addField(`یوزرنیم`, userinfo.name, true)
        .addField(`تگ`, userinfo.discrim, true)
        .addField(`وضعیت`, userinfo.status, true)
        .addField(`ایدی`, userinfo.id)
        .addField(`ساخت شده در`, userinfo.registered)
        .addField(`وارد سرور شد در`, userinfo.joined)
        .setFooter(`${m.author.username} درخواست شده توسط`);
        
        return m.channel.send(userdate);
    }
    });  
  // ============ SERVER ===========
  client.on("message", message => {

    const server = new Discord.MessageEmbed()
      .setColor('#cad347')
      .setAuthor(`${message.guild.name}`)
      .addFields(    
            { name: 'اسم سرور', value: `${message.guild.name}`, inline: true },
            { name: 'ایدی سرور', value: `${message.guild.id}`, inline: true },
            { name: 'صاحب سرور', value: `${message.guild.owner}`, inline: true },
            { name: 'لول تایید مورد نیاز', value: `${message.guild.verificationLevel}`, inline: true },
            { name: 'موقعیت سرور', value: `${message.guild.region}`, inline: true },
            { name: 'مجموع اعضا', value: `${message.guild.memberCount}`, inline: true },
            )
      .setTimestamp()
      .setFooter(`${message.author.username} درخواست شده توسط`);

        if (message.content === `${prefix}server`) {
            message.channel.send(server);
        }     
    });

    // ============ HELP =============
    client.on("message", message => {

      const help = new Discord.MessageEmbed()
          .setColor('#cad347')
        .setTitle(`${message.guild.name} Server Commands`)
        .setThumbnail('https://i.imgur.com/Mvldlmp.png')
        .addFields(
          { name: `${prefix}server`, value: '`نمایش اطلاعات سرور`', inline: true },
          { name: `${prefix}user`, value: '`نمایش اطلاعات کاربر`', inline: true  },
          { name: `${prefix}avatar`, value: '`نمایش پروفایل`', inline: true  },
    )
    .setTimestamp()
    .setFooter(`${message.author.username} درخواست شده توسط`);

        if (message.content === `${prefix}help`) {
            message.channel.send(help);
        }     
    });

    // ============ AVATAR =============
    client.on('message', message => {

      if (message.content === `${prefix}avatar`) {
  
          let embed = new Discord.MessageEmbed();
          if(!message.mentions.users.first()) {
              embed.setTitle('آواتار شما');
              embed.setDescription(`: لینک ها \n[png](${message.author.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${message.author.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${message.author.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${message.author.displayAvatarURL({format: "webp", size: 2048})})`);
              embed.setColor('#cad347');
              embed.setTimestamp();
              embed.setFooter(`${message.author.username} درخواست شده توسط`);
              embed.setImage(message.author.displayAvatarURL({size: 2048, dynamic: true}));
              message.channel.send(embed);

          }
        }
  });

// ============ End ============   
   
   
   

require("dotenv").config()
const { Client, MessageAttachment } = require('discord.js');


const MUTE_CMD = "!mu"
const UNMUTE_CMD = "!un"



client.on("message", (msg) => {
  if (msg.content == "!help") {
      msg.channel.send("Commands you can use:")
      msg.channel.send(MUTE_CMD + ": Mute users")
      msg.channel.send(UNMUTE_CMD + ": UnMute users")
  }
  if (msg.content == "hi") {
      msg.reply("Hi  How Are You")
  }
})





client.on('message', (message) => {


	 
	 

    if (message.content == MUTE_CMD) {
        toggleMute(message, true)
     }
    if (message.content == UNMUTE_CMD) {
        toggleMute(message, false)
    }
	

	
	
});


// helper functions
function toggleMute(message, setMute){
	
	
 
if(message.author.id ==`790872524028248065` || message.author.id ==`5717288255246827721` ) {
	
    if (message.member.voice.channel) {
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (setMute){
                member.voice.setMute(true);
				member.voice.setDeaf(true)
				  
                console.log(member + ' is now muted')
				
            }
            else if (!setMute){
                member.voice.setMute(false);
				member.voice.setDeaf(false)
                console.log(member + ' is now unmuted')
            }
        }
        message.reply(setMute ? 'Everyone is muted!': 'Everyone is unmuted!');
    }
    else {
        message.reply('You need to join a voice channel first!');
    }


	 } 

 else {
      message.channel.send("You Are No Admin");
     }

}

	






   client.on('message', message => {
  // If the message is '!rip'
  if (message.content === '!rip') {
    // Create the attachment using MessageAttachment
    const attachment = new MessageAttachment('./rip.jpg');
	
	
    // Send the attachment in the message channel with a content
	
	message.channel.send(`You Are Dead ${message.author}!`)

	
  }
});

   
   
   
client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();


if(command === `ping`) {
    message.channel.send(`**:ping_pong:Latency is ${ message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms.:ping_pong:**`);
    }
});





   
   

   
   



   
   // Find the config file/request it.
// If you're file from the config is located
// somewhere else please change it here.

// Request the FileServer
const fs = require("fs");


// Create the antiswear message event
   client.on('message', message => {
    
    // Request the file
    var noWords = JSON.parse(fs.readFileSync("./words/blockedWords.json"));
    // Check if CAPS or cApS are
    var msg = message.content.toLowerCase();

    // Check the blockedWords, and if so remove the message 
    // And tell the user to not say that.

    for (let i = 0; i < noWords["blockedWords"].length; i++) {

        // Check the message
        if (msg.includes(noWords["blockedWords"] [i])) {
            // Remove message
            message.delete()
        
            // Send the message and remove the message after 1 second.
    return message.channel.send(`<@${message.author.id}>✖ در جملات خودت حرف زشت بکار نبرید,`)

		//.then(msg => msg.delete({ timeout: 1000 }));

        }
    }
})
   
   



// Definição da variável que contém o canal onde as mensagens serão documentadas
let canal;

// Definição das cores para os widgets
const vermelho = '#fc0303';
const verde = '#14ff08';
const azul = '#08a4ff';
const branco = '#ffffff';

// Inicializa o Bot, possibilitando a leitura dos eventos
client.once('ready', () => {
    console.log('started!');

    // Seleciona em qual canal serão enviadas as mensagens
    client.channels.fetch(channel).then((result) => {
        canal = result;
    });
});



// Documenta as mensagens removidas
client.on('messageDelete', message => {
    if (message.author.bot) return;

    let date = new Date();
    let embedDelete = new Discord.MessageEmbed()
        .setColor(vermelho)
        .setTitle('Message removed')
        .addField('Author', message.author.tag, true)
        .addField('Channel', message.channel.name, true)
        .addField('Send date', message.createdAt.toLocaleString(), true)
        .addField('Removal date', date.toLocaleString(), true)
        .addField('Message', message.cleanContent ? message.cleanContent : '\u200B')
        .setFooter(`Log generated in: ${date.toLocaleString()} - DiscordLogger`);

    if (message.attachments) {
        embedDelete.setImage(message.attachments.filter(({ proxyURL }) => /\.(gif|jpe?g|png|webp)$/i.test(proxyURL)).map(({ proxyURL }) => proxyURL)[0]);
    }

    console.log(`[DELETE] ${date.toLocaleString()} - [${message.channel.name}] ${message.author.tag} removed the message:
                "${message.cleanContent}" | created in: ${message.createdAt.toLocaleString()}`);
    return canal.send(embedDelete);
});

// Documenta as mensagens editadas
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    let date = new Date();
    let embedUpdate = new Discord.MessageEmbed()
        .setColor(azul)
        .setTitle('Edited post')
        .addField('Author', oldMessage.author.tag, true)
        .addField('Channel', oldMessage.channel.name, true)
        .addField('Send date', oldMessage.createdAt.toLocaleString(), true)
        .addField('Edition date', date.toLocaleString(), true)
        .addField('original message', oldMessage.cleanContent ? oldMessage.cleanContent : '\u200B')
        .addField('Edited post', newMessage.cleanContent ? newMessage.cleanContent : '\u200B')
        .setFooter(`Log generated in: ${date.toLocaleString()} - DiscordLogger`);

    if (newMessage.attachments) {
        embedUpdate.setImage(newMessage.attachments.filter(({ proxyURL }) => /\.(gif|jpe?g|png|webp)$/i.test(proxyURL)).map(({ proxyURL }) => proxyURL)[0]);
    }

    console.log(`[UPDATE] ${date.toLocaleString()} - [${oldMessage.channel.name}] ${oldMessage.author.tag} edited the message: "${oldMessage.cleanContent}" for "${newMessage.cleanContent}"`);
    return canal.send(embedUpdate);
});

// Documenta as conexões nas salas de voz e alternancia entre mute
client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member.bot) return;

    let date = new Date();
    let retorno = new Discord.MessageEmbed()

    const oldChannel = oldState.channel;
    const newChannel = newState.channel;



	
	
	var currentdate = new Date();


    // Troca de canal
    if (oldChannel && newChannel) {
        // Microfone mutado
	

   if (!Boolean(oldState.mute) && Boolean(newState.mute)) {
   let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
		    .addField("Left Time:", `${currentdate}`)
            .setDescription(`[MUTE] ${date.toLocaleString()} - [${newChannel}] ${oldState.member.user.tag}: muted the microphone`);
        console.log(`[MUTE] ${date.toLocaleString()} - [${newChannel}] ${oldState.member.user.tag}: muted the microphone`);
        retorno = mensagemRetorno;

			

			

        } else if (Boolean(oldState.mute) && !Boolean(newState.mute)) {
            let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
			.addField("Left Time:", `${currentdate}`)
            .setDescription(`[UNMUTE] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: unmuted the microphone`);

        console.log(`[UNMUTE] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: unmuted the microphone`);
        retorno = mensagemRetorno;

			
        } else if (!Boolean(oldState.deaf) && Boolean(newState.deaf)) {
            let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
			.addField("Left Time:", `${currentdate}`)
            .setDescription(`[deafen] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: muted the audio`);


        console.log(`[deafen] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: muted the audio`);
        retorno = mensagemRetorno;


        } else if (Boolean(oldState.deaf) && !Boolean(newState.deaf)) {
            let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
			.addField("Left Time:", `${currentdate}`)
            .setDescription(`[undeafen] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: unmuted the audio`);
            

        console.log(`[undeafen] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: unmuted the audio`);
        retorno = mensagemRetorno;


			
        } else if(!Boolean(oldState.streaming) && Boolean(newState.streaming)) {
            let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
			.addField("Left Time:", `${currentdate}`)
            .setDescription(`[STREAMON] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: started a stream`);
            

        console.log(`[STREAMON] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: started a stream`);
        retorno = mensagemRetorno;
		
				
        } else if (Boolean(oldState.streaming) && !Boolean(newState.streaming)) {
            let mensagemRetorno = new Discord.MessageEmbed()
            .setColor(vermelho)
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
			.addField("Left Time:", `${currentdate}`)
            .setDescription(`[STREAMOFF] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: ended a stream`);

        console.log(`[STREAMOFF] ${date.toLocaleString()} - [${newChannel.name}] ${oldState.member.user.tag}: ended a stream`);
        retorno = mensagemRetorno;
		
			

        // Troca entre salas
        } else {
            let embedChange = new Discord.MessageEmbed()
                .setColor(branco)
                .setTitle('User switched channels')
                .addField('User', oldState.member.user.tag, true)
                .addField('Date', date.toLocaleString(), true)
                .addField('Old Channel', oldChannel)
                .addField('New channel', newChannel, true)
                .setFooter(`Log generated in: ${date.toLocaleString()} - DiscordLogger`);

            console.log(`[CHANGE] ${date.toLocaleString()} - ${oldState.member.user.tag} changed channels: [${oldChannel.name}] for [${newChannel.name}]`);
            retorno = embedChange;
        }
    // Nova conexão a um canal
    } else if (Boolean(newChannel)) {
        let embedConnect = new Discord.MessageEmbed()
            .setColor(verde)
            .setTitle('User joined a channel')
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
            .addField('Channel', newChannel)
            .setFooter(`Log generated in: ${date.toLocaleString()} - DiscordLogger`);

        console.log(`[CONNECT] ${date.toLocaleString()} - ${oldState.member.user.tag} joined the channel: [${newChannel.name}]`);
        retorno = embedConnect;
    // Saiu de um canal
    } else if (!Boolean(newChannel)) {
        let embedDisconnect = new Discord.MessageEmbed()
            .setColor(vermelho)
            .setTitle('User left a channel')
            .addField('User', oldState.member.user.tag, true)
            .addField('Date', date.toLocaleString(), true)
            .addField('Old Channel', oldChannel)
            .setFooter(`Log generated in: ${date.toLocaleString()} - DiscordLogger`);

        console.log(`[DISCONNECT] ${date.toLocaleString()} - ${oldState.member.user.tag} left the channel: [${oldChannel.name}]`);
        retorno = embedDisconnect;
    }

	
	    return canal.send(retorno);

	
});







client.on("message", async (msg) => {
  if (msg.content === "hello") {
    msg.reply(" hello ");
  }

  if (msg.content === `${prefix}pvh`) {
    if (!msg.content.startsWith(prefix)) return;
    client.users.get("790872524028248065").send(msg.member.nickname);
    msg.reply("پیام شما ارسال شد");
  }

  if (msg.content === "%myfs") {
    if (msg.member.id === "790872524028248065") {
      msg.channel.send("your favorite soung is:", {
        file:
          "https://up.20script.ir/file/daf8-Can-t-Help-Falling-In-Love-unregistered.mp3"
      });
      msg.channel.send("", {
        file:
          "https://up.20script.ir/file/5d8b-The-Wonder-of-You-unregistered.mp3"
      });
    }
  }

  if (msg.content === `${prefix}poweroff`) {
    if (msg.member.id === "790872524028248065" || "5717288255246827721") {
      msg.reply("are you sure ? ").then(msg.content === "%yes");
      bot.destroy();
    } else {
      msg.reply("your Are No admin");
    }
  }
  //if (msg.member.roles.some(role => role.name === "Rank1")) {
  // if (msg.content === "کص") {
  // msg.delete();
  //msg.reply("شما نمیتوانید از این کلمات استفاده کنید");
  //  }
  // }

  //if (msg.content.startsWith(":joy:" && "😂")) {
 //   if (
  //    msg.member.nickname === "moslem" &&
   //   "AZG|~Wild Wolf~|" &&
      "♪~AZG♪~TNT♪~"
  //  ) {
  //    msg.delete();
  //    msg.reply("شما حق استفاده از اموجی خنده را ندارید بامدیریت هماهنگ کنید");
   // }
 // }

  if (msg.content === "خوبی") {
    msg.reply("هی یه رمی میکشیم تو چطوری");
  }
  if (msg.content === "سلام") {
    if (msg.member.id === "790872524028248065") {
      msg.reply("👾سلام عمو وی جی دی🤩");
    } else {
      msg.reply("سلام چطوری خوبی");
    }
  }
  if (msg.content === "سلام ربات") {
    if (msg.member.nickname === "moslem") {
      msg.reply("سلام عشقم");
    } else {
      msg.reply("تو چی میگی این وسط خره");
    }
  }

  if (msg.content === "چطوری") {
    msg.react("😘");
    msg.react("😉");
    msg.react("👻");
  }
});









const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};


























   
   
   
   
   
   
client.login(token);
