const { BOT_EMOJI, BOT_NAME, PREFIX } = require("../config");

function errorMessage(message) {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
}

function warningMessage(message) {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
}

function doneMessage(message) {
  return `${BOT_EMOJI} 👍 Está Pronto ${message}`
}

function menuMessage() {
  const date = new Date();

  return `╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • Bot em Desenvolvimento ${BOT_NAME} 💀
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
▢ • Prefixo: ${PREFIX}
▢
╰━━─「🪐」─━━

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}cep - Consulte o endereço pelo CEP
▢ • ${PREFIX}ping -  Vejá o que acontece
▢ • ${PREFIX}sticker - Faça uma img/gif se tornar um sticker
▢ • ${PREFIX}toimg - Faça um sticker se tornar uma img 
▢ • ${PREFIX}ideia - Envia uma ideia de comando
▢ • ${PREFIX}jao - ${'nunca use esse comando'.toUpperCase}
▢ • ${PREFIX}server - Entre no nosso server do discord
▢ • ${PREFIX}fato - Fatos que o ${BOT_NAME} sabe
▢ • ${PREFIX}doe - Doe apenas 1 real para o ${BOT_NAME} (necessario 5 reais)
▢
╰━━─「🚀」─━━`;
}

function menuMessage() {
  return `${BOT_EMOJI} Doe apenas R$1,00 para o ${BOT_NAME} continuar funcionado :)\nClique no link para a doação: livepix.gg/polabiel\nou use minha chave-pix:17f19897-d99a-4537-8e77-068b3343cc48`;
}

module.exports = {
  errorMessage,
  menuMessage,
  warningMessage,
  doneMessage,
};
