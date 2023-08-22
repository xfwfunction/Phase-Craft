const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./config.json');

var statustring = "Bağlantı hatası!";
var request = require('request');
var mcIP = ayarlar.ip;

var url = 'https://api.mcsrvstat.us/2/' + mcIP;

function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
      }
      body = JSON.parse(body);
      var status = ' ' + body.players.online + " Kişi PHASECRAFT'TA";
      console.log(body.description);
      if(body.players.online) {
          if((body.description=="&cBakımdayız."))
            client.user.setStatus('idle')
            .catch(console.error)
          } else {
            client.user.setStatus('online')
            //.then(console.log)
            .catch(console.error);
          }
        
            if(body.players) {
                status = ' ' + body.players.online + " Kişi PHASECRAFT'TA";
                client.channels.cache.get(ayarlar.kanal_id).setName('• Aktif: '+ body.players.online + '/'+ body.players.max);
              } else {
                status = ' 0/' + body.max_players;
                client.channels.cache.get(ayarlar.kanal_id).setName('• Aktif: '+ 0 + '/'+ body.max_players);
      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);

    })
  }

  client.on('message', async (message) => {
    if(message.content === '!ip') {
      message.channel.send(`Sunucumuzun ipsi \`${ayarlar.ip}\` dir. Sunucuya girmeyi unutmayınız.`)
   }
});


  
client.on("ready", () => {
  console.log(mcIP);
  client.setInterval(update,30000);
})

client.login(ayarlar.token);
