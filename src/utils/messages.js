const { BOT_EMOJI, BOT_NAME, PREFIX, OWNER } = require("../config");

function errorMessage(message) {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
}

function warningMessage(message) {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
}

function menuMessage() {
  const date = new Date();

  return `​​
  ╭───────────────┐
  ├── MENU DE COMANDOS 
  ├───────────────
  │ Bot em desenvolvimento | ${BOT_NAME}
  │ Data: ${date.toLocaleDateString("pt-br")}
  │ Hora: ${date.toLocaleTimeString("pt-br")}
  │ Prefixo: ${PREFIX}
  ╰──────────┐
  ╭──────────┴─┐
  │ COMANDOS/BÁSICOS
  ├────────────
  │▢ • ${PREFIX}sticker — Transforme uma img/gif em sticker
  │▢ • ${PREFIX}cep — Consulta o CEP mostrando o endereço por ele
  │▢ • ${PREFIX}ping — Retorna a latencia do servidor real
  │▢ • ${PREFIX}toimg — Transforme um sticker em image
  │▢ • ${PREFIX}ideia — Escreva sua ideia de comandos para o @Pola
  │▢ • ${PREFIX}adm — Em desevolvimento
  ╰──────────┘
  `;
}
  
module.exports = {
  errorMessage,
  menuMessage,
  warningMessage,
};
