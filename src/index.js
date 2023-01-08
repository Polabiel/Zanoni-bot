// File-system pra ler a package.json
const fs = require('fs');
// Variaveis para iniciar o bot
const connect = require("./connection");
const middlewares = require("./middlewares");
const { BOT_NAME, BOT_EMOJI } = require("./config")

//Função assíncrona para iniciar o bot

async function start() {
  try {
    const bot = await connect();
  console.log(`${BOT_NAME.toUpperCase()}`,`${BOT_EMOJI} —`, (`Aguarde, estou iniciado o ${BOT_NAME}\n`));
  await middlewares(bot);
  console.log(`${BOT_NAME.toUpperCase()} ${BOT_EMOJI} — Tá online`)
  } catch (error) {
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[GRAVE] Rejeição possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});
  }
}

start();


