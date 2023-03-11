// Variaveis para iniciar o bot
const connect = require("./connection");
const middlewares = require("./middlewares");
const { BOT_NAME, BOT_EMOJI } = require("./config");
const botBaileys = "./assets/auth/baileys";
const botBaileysDev = "./assets/auth/baileysdev";

// Variaveis de SquareCloud
const fs = require("fs");
const SquareCloudAPI = require("@squarecloud/api");
const atributes = JSON.parse(fs.readFileSync("./assets/settings/keys.json"));
const api = new SquareCloudAPI(atributes.api);

//Função assíncrona para iniciar o bot

function SquareRestart() {
  const RESTART_INTERVAL = 3600000; // 1 hora

  // função para reiniciar a API
  async function restartAPI() {
    try {
      const application = await api.getApplication(atributes.bot);
      console.log(`Reiniciando o aplicativo ${application.name}`);
      await application.restart();
      console.log("O aplicativo foi reiniciado com sucesso");
    } catch (error) {
      console.log("Uma exceção foi lançada: ", error);
    }
  }
  // iniciar a reinicialização da API em um intervalo de tempo fixo
  setInterval(restartAPI, RESTART_INTERVAL);
  console.log(
    `Iniciando reinicialização da API a cada ${
      RESTART_INTERVAL / 1000 / 60
    } minutos`
  );
}

async function start() {
  try {
    const bot = await connect(botBaileys);
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
console.log("\n");
SquareRestart();
