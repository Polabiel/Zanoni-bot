const { isCommand, extractDataFromMessage } = require("./utils");
const Action = require("./actions");

async function middlewares(bot) {
  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];
    const action = new Action(bot, baileysMessage);
    action.createContacts();

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const { command } = extractDataFromMessage(baileysMessage);

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
        await action.menu();
        break;
      case "ping":
        await action.ping();
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
      case "fato":
      case "fatos":
        action.fatos();
        break;
      case "server":
      case "pola":
      case "discord":
      case "haze":
        action.server();
        break;
      case "doa":
      case "doação":
      case "doe":
        action.doa();
        break;
      case "doe":
      case "doar":
      case "doação":
        action.doe();
        break;
      case "sayall":
        action.sayAll();
        break;
      default:
        action.default();
        break;
    }
  });
}

module.exports = middlewares;