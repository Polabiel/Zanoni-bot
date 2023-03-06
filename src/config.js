const path = require("path");

const PREFIX = "/";
const BOT_EMOJI = "🤖";
const BOT_NAME = "Zanoni BOT";
const TEMP_FOLDER = path.resolve(__dirname, "..", "assets", "temp");
const NUMBER_OWNER = "5519981022857" // Digite o apenas seu número
const CONTACTS_PATH = path.join(__dirname, '..','assets','auth','contacts.json');

module.exports = {
  BOT_EMOJI,
  BOT_NAME,
  PREFIX,
  TEMP_FOLDER,
  NUMBER_OWNER,
  CONTACTS_PATH,
};
