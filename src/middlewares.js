const { isCommand, extractDataFromMessage, remoteJid } = require("./utils");
const Action = require("./actions");

async function middlewares(bot) {
  let lastCommandTime = 0;

  bot.ev.on("messages.upsert", async ({ messages }) => {
    const baileysMessage = messages[0];
    const action = new Action(bot, baileysMessage);

    action.presenceAvailable();
    action.readMessage();
    action.createContacts();

    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return;
    }

    const { command } = extractDataFromMessage(baileysMessage, bot);

    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastCommandTime;
    if (timeDiff < 5000) {
      await new Promise((resolve) => setTimeout(resolve, 5000 - timeDiff));
    }
    lastCommandTime = new Date().getTime();

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
      case "doe":
      case "doar":
      case "doação":
        action.doa();
        break;
      case "sayall":
      case "say":
        action.sayAll();
        break;
      case "marca":
      case "all":
        action.markAll();
        break;
      case "log":
        action.log();
        break;
      case "bot":
      case "simsimi":
      case "simi":
        action.simsimi();
        break;
      case "menustaff":
      case "staff":
        action.menuStaff();
        break;
      default:
        action.default();
        break;
    }
  });
}

module.exports = middlewares;
