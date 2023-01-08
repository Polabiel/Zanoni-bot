const reactionMessage = {
    text: ["⌛", "✅", "❌", "⚠️"],
}

 function checkGreen() {
    return bot.sendMessage(this.remoteJid ,reactionMessage.text[1], this.idMessage);
}

function checkRed() {
    return this.bot.sendMessage(this.remoteJid ,reactionMessage.text[2], this.idMessage);
}

function checkPro() {
    return this.bot.sendMessage(this.remoteJid ,reactionMessage.text[0], this.idMessage);
}

function checkWarning() {
    return this.bot.sendMessage(this.remoteJid ,reactionMessage.text[3], this.idMessage);
}

module.exports = { checkGreen, checkPro, checkRed, checkWarning }