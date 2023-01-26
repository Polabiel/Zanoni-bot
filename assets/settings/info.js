const SquareCloudAPI = require("@squarecloud/api");
const fs = require("fs");
const atributes = JSON.parse(fs.readFileSync("./keys.json"));

async function atributesApplication() {
  const api = new SquareCloudAPI(atributes.api);

  const zanoni_bot_minecraft = await api.getApplication(
    atributes.bot_minecraft
  );
  const zanoni_bot_whatsapp = await api.getApplication(atributes.bot_whatsapp);
  const zanoni_bot_discord = await api.getApplication(atributes.bot_discord);

  zanoni_bot_discord.getLogs(true);
}

console.log(atributesApplication());