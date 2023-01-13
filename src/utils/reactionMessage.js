const reactionMessage = {
    text: ["⌛", "✅", "❌", "⚠️"],
}

function checkGreen() {
    return bot.sendMessage(remoteJid, reactionMessage.text[1], idMessage);
}

function checkRed(bot) {
    return bot.sendMessage(remoteJid, reactionMessage.text[2], idMessage);
}

function checkPro(bot) {
    return bot.sendMessage(remoteJid, reactionMessage.text[0], idMessage);
}

function checkWarning(bot,remoteJid,idMessage) {
    return bot.sendMessage(remoteJid, reactionMessage.text[3], idMessage);
}

console.log(checkGreen(),
    checkPro(),
    checkRed(),
    checkWarning())

module.exports = { checkGreen, checkPro, checkRed, checkWarning }