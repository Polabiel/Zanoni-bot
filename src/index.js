// Variaveis para iniciar o bot
const connect = require("./connection");
const middlewares = require("./middlewares");
const { BOT_NAME, BOT_EMOJI } = require("./config");

// Variaveis de SquareCloud
const fs = require("fs");
const SquareCloudAPI = require("@squarecloud/api");
const atributes = JSON.parse(fs.readFileSync("./assets/settings/keys.json"));

//Função assíncrona para iniciar o bot

function SquareRestart() {
  const INTERVAL = 3600000; // tempo em milisegundos (10 minutos)

  // função para reiniciar a API
  async function restartAPI() {
    try {
      const api = new SquareCloudAPI(atributes.api);
      const application = await api.getApplication(atributes.bot);
      await application.restart();
    } catch (error) {
      s;
      console.log("Uma exceção foi lançada: ", error);
    }
  }

  // iniciar a reinicialização da API
  setInterval(restartAPI, INTERVAL);
  console.log(
    "Iniciando reinicialização da API a cada",
    INTERVAL / 60000,
    "minutos."
  );
}

async function start() {
  try {
    const bot = await connect();
    console.log(
      `${BOT_NAME.toUpperCase()}`,
      `${BOT_EMOJI} —`,
      `Aguarde, estou iniciado o ${BOT_NAME}\n`
    );
    await middlewares(bot);
    console.log(`${BOT_NAME.toUpperCase()} ${BOT_EMOJI} — Tá online`);
  } catch (error) {
    process.on("uncaughtException", (err) => {
      console.log("Uncaught Exception: " + err);
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.log(
        "[GRAVE] Rejeição possivelmente não tratada em: Promise ",
        promise,
        " motivo: ",
        reason.message
      );
    });
  }
}

start();
console.log('\n');
SquareRestart();