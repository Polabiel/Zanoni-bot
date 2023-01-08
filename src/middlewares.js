const { BOT_EMOJI } = require("./config");
const { isCommand, extractDataFromMessage } = require("./utils");
const Action = require("./actions");
const { menuMessage } = require("./utils/messages");

async function middlewares(bot) {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const action = new Action(bot, baileysMessage);

    const { command, remoteJid } = extractDataFromMessage(baileysMessage);

    switch (command.toLowerCase()) {
      case "menu":
      case "/":
      case "?":
      case "help":
          await bot.sendMessage(remoteJid, {text: `${menuMessage()}`,
          });
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
      case "ping":
        await action.ping();
        break;
      case "toimage":
      case "to-image":
      case "toimg":
        await action.toImage();
        break;
      default:
        await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Esse comando não existe!\nAcesse o */MENU* e use meus comandos` })
        break
    }
  });
}

module.exports = middlewares;
