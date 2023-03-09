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
  const MAX_MEMORY_USAGE = 100 * 1024 * 1024; // 100 MB
  const MEMORY_CHECK_INTERVAL = 60000; // 1 minuto
  const RESTART_INTERVAL = 3600000; // 1 hora

  // função para reiniciar a API
  async function restartAPI() {
    try {
      const api = new SquareCloudAPI(atributes.api);
      const application = await api.getApplication(atributes.bot);
      console.log(`Reiniciando o aplicativo ${application.name}`);
      await application.restart();
      console.log('O aplicativo foi reiniciado com sucesso');
    } catch (error) {
      console.log("Uma exceção foi lançada: ", error);
    }
  }

  // função para verificar o uso de memória e reiniciar se necessário
  async function checkMemoryUsage() {
    try {
      const api = new SquareCloudAPI(atributes.api);
      const application = await api.getApplication(atributes.bot);
      console.log(`Verificando o uso de memória do aplicativo ${application.name}`);
      const status = await application.getStatus();
      console.log(`O aplicativo está usando aproximadamente ${status.memoryUsage} bytes de memória`);
      if (status.memoryUsage >= MAX_MEMORY_USAGE) {
        console.log('A memória atingiu o limite crítico. Reiniciando o aplicativo...');
        await restartAPI();
      }
    } catch (error) {
      console.log("Uma exceção foi lançada: ", error);
    }
  }

  // iniciar a verificação de memória em um intervalo de tempo fixo
  setInterval(checkMemoryUsage, MEMORY_CHECK_INTERVAL);
  console.log(`Iniciando verificação contínua do uso de memória a cada ${MEMORY_CHECK_INTERVAL / 1000} segundos`);

  // iniciar a reinicialização da API em um intervalo de tempo fixo
  setInterval(restartAPI, RESTART_INTERVAL);
  console.log(`Iniciando reinicialização da API a cada ${RESTART_INTERVAL / 1000 / 60} minutos`);
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
console.log("\n");
SquareRestart();
