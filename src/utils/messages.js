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
▢ • ${PREFIX}jao - NUNCA USE ESSE COMANDO
▢ • ${PREFIX}server - Entre no nosso server do discord
▢ • ${PREFIX}fato - Fatos que o Zanoni BOT sabe
▢ • ${PREFIX}gpt - caso tenha algum bug, envie pro dono um msg
▢
╰━━─「🚀」─━━`;
}

function consoleError(message) {
  return `${BOT_EMOJI} ❌ Erro! Não sei o que rolou cara, dá uma olhada\n${message}`
}

module.exports = {
  errorMessage,
  menuMessage,
  warningMessage,
  doneMessage,
  consoleError,
};
