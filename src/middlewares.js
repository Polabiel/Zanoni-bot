const { isCommand, extractDataFromMessage } = require("./utils");
const { sender } = extractDataFromMessage
const Action = require("./actions");

async function middlewares(bot) {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const action = new Action(bot, baileysMessage);

    const { command, remoteJid} = extractDataFromMessage(baileysMessage);

    switch (command.toLowerCase()) {
      case "gpt":
        await action.chatGPT();
        break
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
        await action.menu();
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
        await action.jao();
        break;
        case 'fato':
        case 'fatos':
          action.fatos()
          break;
      case "server":
      case "pola":
      case "discord":
      case "haze":
        action.server()
        break;
      case "doa":
      case "doação":
      case "doe":
        action.doa()
        break
      case "doe":
      case "doar":
      case "doação":
        action.doe()
        break;
      default:
        action.default()
        break;
    }
  });

  bot.ev.on('message', async (bot) => {
    const contact = await bot.contacts.get(sender);
    if (contact.isNewUser) {
      const userData = {
        number: sender,
      };
      const jsonUserData = JSON.stringify(userData);
      // Salve o JSON em um arquivo ou envie para algum lugar
    }
  });
}

module.exports = middlewares;
