const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./config.json');

var statustring = "Bağlantı hatası!";
var request = require('request');
var mcIP = ayarlar.ip;

var url = 'http://mcapi.tc/?' + mcIP + '/json';

function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
      }
      body = JSON.parse(body);
      var status = ' ' + body.players + " Kişi PHASECRAFT'TA";
      console.log(body.description);
      if(body.players) {
          if((body.description=="&cWe are under maintenance.")
            client.user.setStatus('idle')
            .catch(console.error);
          }else{
            client.user.setStatus('online')
            //.then(console.log)
            .catch(console.error);
          }
            if(body.players) {
                status = ' ' + body.players + " Kişi PHASECRAFT'TA";
                client.channels.get(`sunucunuzda anlık olarak değiştirilecek kanal idsi`).setName('• Aktif: '+ body.players + '/'+ body.max_players);
              } else {
                status = ' 0/' + body.max_players;
                client.channels.get(`sunucunuzda anlık olarak değiştirilecek kanal idsi`).setName('• Aktif: '+ 0 + '/'+ body.max_players);
        }
      } else {
        client.user.setStatus('dnd')
        .catch(console.error);
      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  }); 
}

client.on("ready", () => {
  console.log(mcIP);
  client.setInterval(update,30000);
})

client.login(ayarlar.token);
