const { BOT_EMOJI, BOT_NAME, PREFIX, OWNER } = require("../config");

function errorMessage(message) {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
}

function warningMessage(message) {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
}

function menuMessage() {
  const date = new Date();

  return `╭━━⪩ Menu ⪨━━
▢
▢ • Bot em desenvolvimento | ${BOT_NAME} 
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
▢ • Prefixo: ${PREFIX}
▢
╰━━─「」─━━

╭━━⪩ Comandos ⪨━━
▢
▢ • ${PREFIX}cep - Mostrar a localização com o CEP
▢ • ${PREFIX}ping - Mostrar latência do servidor
▢ • ${PREFIX}sticker - Transformar gif/img em figurinha
▢ • ${PREFIX}toimg - Transformar img em figurinha 
▢
╰━━─「」─━━`;
}

module.exports = {
  errorMessage,
  menuMessage,
  warningMessage,
};
