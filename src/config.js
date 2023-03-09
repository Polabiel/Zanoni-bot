const path = require("path");

const PREFIX = "/"; // Digita Apenas o prefixo do seu bot
const BOT_EMOJI = "🤖"; // Emoji padrão do bot
const BOT_NAME = "zanoni Bot"; // Digite o nome do bot
const TEMP_FOLDER = path.resolve(__dirname, "..", "assets", "temp"); // Path da Pasta Temporaria
const NUMBER_OWNER = "5519981022857" // Número do proprietario do código
const NUMBER_HOST = "5519981022857" // Digite o apenas o seu número
const CONTACTS_PATH = path.join(__dirname, '..','assets','auth','contacts.json'); // Path de contatos
const NUMBER_BOT =  "553187465917" // Digite apenas o número do seu bot

module.exports = {
  BOT_EMOJI,
  BOT_NAME,
  PREFIX,
  TEMP_FOLDER,
  NUMBER_OWNER,
  CONTACTS_PATH,
  NUMBER_BOT,
  NUMBER_HOST,
};
