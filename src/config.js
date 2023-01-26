const path = require("path");

const PREFIX = "/";
const BOT_EMOJI = "🤖";
const BOT_NAME = "Zanoni BOT";
const TEMP_FOLDER = path.resolve(__dirname, "..", "assets", "temp");

module.exports = {
  BOT_EMOJI,
  BOT_NAME,
  PREFIX,
  TEMP_FOLDER,
};
