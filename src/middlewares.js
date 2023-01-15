const { BOT_EMOJI } = require("./config");
const { isCommand, extractDataFromMessage } = require("./utils");
const Action = require("./actions");
const { menuMessage } = require("./utils/messages");
const { errorMessage, warningMessage } = require("./utils/messages");
const fs = require('fs')

async function middlewares(bot) {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];
    console.log(baileysMessage);

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const action = new Action(bot, baileysMessage);

    const { command, remoteJid} = extractDataFromMessage(baileysMessage);

    switch (command.toLowerCase()) {
      case "ideia":
        await action.ideia();
        break;
      case "cep":
        await action.cep();
        break;
      case "f":
      case "fig":
      case "s":
      case "sticker":
        await action.sticker();
        break;
      case "menu":
        await bot.sendMessage(remoteJid, {
          react: {
            text: "⏳",
            key: baileysMessage.key
          }
        })
        await bot.sendMessage(remoteJid, {
          text: `${menuMessage()}`,
        });
        await bot.sendMessage(remoteJid, {
          react: {
            text: "✅",
            key: baileysMessage.key
          }
        })
        break;
      case "ping":
        await action.ping()
        break;
      case "toimage":
      case "toimg":
        await action.toImage();
        break;
      case "jao":
      case "joão":
      case "joao":
      case "jão":
        await bot.sendMessage(
          remoteJid, 
          { 
              video: fs.readFileSync("media/video/jao.mp4"), 
              caption: "eu avisei",
              gifPlayback: true
          }
      )
        break;
      case "server":
      case "pola":
      case "discord":
      case "haze":
        await bot.sendMessage(remoteJid,{text: `${BOT_EMOJI} Entra no Servidor do discord do Pola: https://discord.gg/jAYqa89fxW 😰\nE no servidor da Haze no Discord: https://discord.gg/3qgtSr6SrZ 💀`},{ quoted: baileysMessage})
        break;
      default:
        await bot.sendMessage(remoteJid, { text: errorMessage('Esse comando não existe, use o */MENU*') })
    }
  });
}

module.exports = middlewares;
