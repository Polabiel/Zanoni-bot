const { isCommand, extractDataFromMessage } = require('../utils')
const { BOT_EMOJI } = require('./config')
const { Action } = require('./actions')

async function middlewares(bot) {
    bot.ev.on('messages.upsert', async ({ messages }) => {
        const baileysMessage = messages[0]

        if (!baileysMessage?.message || !isCommand(baileysMessage)) {
            return
        }

        const action = new Action(bot, baileysMessage)

        const { command, remoteJid } = extractDataFromMessage(baileysMessage)

        switch (command.toLowerCase()) {
            case 'f':
            case 'fig':
            case 'figurinha':
            case 's':
            case 'sticker':
                await action.sticker()
                break
            case 'ping':
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Pong!` })
                break
            case 'toimage':
            case 'toimg':
                await action.toImage()
                break
            case 'help':
            case 'menu':
            case '?':
            case '/':
                await bot.sendMessage(remoteJid, { text: `Zanoni - BOT${BOT_EMOJI}\nComandos disponiveis:\n\nTransformar uma figurinha (não animada) em foto\n\n- /toimage\n- /toimg\n\n/Comando de Ping para teste de latencia\n\n- /ping\n\nTransformar imagem(não animada) para figurinha\n\n- /sticker \n- /f \n- /fig \n- /figurinha\n- /s` })
                break
        }
    })
}

module.exports = middlewares