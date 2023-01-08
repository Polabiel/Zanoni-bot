const { BOT_EMOJI, BOT_NAME, PREFIX } = require("../config");

function errorMessage(message) {
    return `${BOT_EMOJI} ❌ Erro! ${message}`
}

function warningMessage(message) {
    return `${BOT_EMOJI} ⚠ Atenção! ${message}`
}

function menuMessage() {
    const date = new Date()
    return `-------Bem-vindo-------
    ~ ${BOT_NAME}
    ~ Data: ${date.toLocaleDateString("pt-br")}
    ~ Hora: ${date.toLocaleTimeString("pt-br")}
    ~ Prefixo: ${PREFIX}
    ---------------

    -------menu-------
    ~ ${PREFIX}cep
    ~ ${PREFIX}ping
    ~ ${PREFIX}sticker
    ~ ${PREFIX}to-image
    ---------------
    `
}

modules.exports = { errorMessage, warningMessage, menuMessage }