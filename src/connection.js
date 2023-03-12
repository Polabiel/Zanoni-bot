const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
} = require("@adiwajshing/baileys");
const p = require("pino");

async function connect(authFolderPath) {
  const { state, saveCreds } = await useMultiFileAuthState(authFolderPath);

  const bot = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    defaultQueryTimeoutMs: undefined,
    logger: p({ level: "silent" }),
  });

  bot.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        connect(authFolderPath);
      }
    }
  });

  bot.ev.on("creds.update", saveCreds);

  return bot;
}

module.exports = connect;
